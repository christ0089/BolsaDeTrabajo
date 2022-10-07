import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({credential: admin.credential.applicationDefault()});

export const applicationUserCreate = functions.https.onCall((data, context) => {
  if (!context.auth?.uid) {
    return;
  }

  const uid = context.auth?.uid;
  const {jobApplication, employer} = data;

  let docRef = admin
      .firestore()
      .collection(`users/${uid}/job_applications`)
      .doc();

  let id = docRef.id;
  if (jobApplication.id) {
    id = jobApplication.id;
    docRef = admin
        .firestore()
        .collection(`users/${uid}/job_applications`)
        .doc(id);
  }

  docRef.set(jobApplication);

  admin
      .firestore()
      .collection(`employeers/${employer.id}/job_applications`)
      .doc(id)
      .set(jobApplication, {
        merge: true,
      });
});

export const applicationUserDelete = functions.https.onCall(
    async (data, context) => {
      if (!context.auth?.uid) {
        return;
      }

      const uid = context.auth?.uid;
      const {employeerId, jobApplicationId} = data;

      // Check User is owner of the Application

      const employeeApplicationRef = await admin
          .firestore()
          .collection(`employeers/${employeerId}/job_applications`)
          .doc(jobApplicationId)
          .get();

      if (!employeeApplicationRef.exists) {
        return;
      }

      const employeeApplicationData = employeeApplicationRef.data();

      if (employeeApplicationData?.personal_data.uid !== uid) { // eslint-disable-line
        return;
      }

      await admin
          .firestore()
          .collection(`users/${uid}/job_applications`)
          .doc(jobApplicationId)
          .set(
              {
                active: false,
              },
              {
                merge: true,
              }
          );

      await admin
          .firestore()
          .collection(`employeers/${employeerId}/job_applications`)
          .doc(jobApplicationId)
          .set(
              {
                active: false,
              },
              {
                merge: true,
              }
          );
    }
);

export const userPromotion = functions.https.onCall(async (data, context) => {
  const {userUid, role} = data;
  if (!context.auth?.uid) {
    return;
  }
  const adminUid = context.auth?.uid;
  const adminSnap = await admin
      .firestore()
      .collection("users")
      .doc(adminUid)
      .get();

  if (!adminSnap.exists) {
    return;
  }
  const adminData = adminSnap.data();

  if (adminData?.user_role !== "admin") { // eslint-disable-line
    return;
  }

  await admin.firestore().collection("users").doc(`${userUid}`).set(
      {
        user_role: role,
      },
      {
        merge: true,
      }
  );
});

export const deactivateAccount = functions.https.onCall(
    async (data, context) => {
      const {userUid, active} = data;

      if (!context.auth?.uid) {
        return;
      }

      const adminUid = context.auth?.uid;

      const adminSnap = await admin
          .firestore()
          .collection("users")
          .doc(adminUid)
          .get();

      const userSnap = await admin.firestore().collection("users")
          .doc(userUid);

      if (!adminSnap.exists) {
        return;
      }
      const adminData = adminSnap.data();

      if (adminData?.user_role !== "admin") { // eslint-disable-line
        return;
      }

      await admin.auth().updateUser(userUid, {
        disabled: active,
      });

      await userSnap.set(
          {
            disabled: active,
          },
          {
            merge: true,
          }
      );
    }
);

export const employeerUpdate = functions.firestore
    .document("employeer/{id}")
    .onUpdate((data, context) => {
      const employerId = context.params.id;

      if (!data.after.exists) {
        return;
      }
      const afterJob = data.after.data();

      const jobListings = admin
          .firestore()
          .collection("job_listing")
          .where("employer.id", "==", employerId)
          .get();

      return jobListings.then((docs) => {
        const promises = docs.docs.map((doc) => {
          return doc.ref.set(
              {
                active: afterJob.active,
                employeer: {
                  company_name: afterJob.name,
                  id: employerId,
                },
              },
              {
                merge: true,
              }
          );
        });
        return Promise.all(promises);
      });
    });
