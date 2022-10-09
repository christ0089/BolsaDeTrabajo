import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({ credential: admin.credential.applicationDefault() });

export const applicationUserCreate = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid) {
      return { status: 400 };
    }

    const uid = context.auth?.uid;
    const { jobApplication, employer } = data;

    let docRef = admin
      .firestore()
      .collection(`users/${uid}/job_applications`)
      .doc();

    let id = docRef.id;

    try {
      if (jobApplication.id) {
        id = jobApplication.id;
        docRef = admin
          .firestore()
          .collection(`users/${uid}/job_applications`)
          .doc(id);
      }

      await docRef.set(jobApplication);

      await admin
        .firestore()
        .collection(`employeers/${employer.id}/job_applications`)
        .doc(id)
        .set(jobApplication, {
          merge: true,
        });

      await admin
        .firestore()
        .doc(`job_listings/${jobApplication.job_position.id}`)
        .update({ applicants: firestore.FieldValue.increment(1) });
      return { status: 200 };
    } catch (e: any) {
      return { status: 400 };
    }
  }
);

export const applicationUserDelete = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid) {
      return { status: 400 };
    }

    const uid = context.auth?.uid;
    const { employeerId, jobApplicationId } = data;

    // Check User is owner of the Application

    const employeeApplicationRef = await admin
      .firestore()
      .collection(`employeers/${employeerId}/job_applications`)
      .doc(jobApplicationId)
      .get();

    if (!employeeApplicationRef.exists) {
      return { status: 400 };
    }

    const employeeApplicationData = employeeApplicationRef.data();

    if (employeeApplicationData?.personal_data.uid !== uid) {
      // eslint-disable-line
      return { status: 400 };
    }

    try {
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

      return { status: 200 };
    } catch (e: any) {
      return { status: 400 };
    }
  }
);

export const userPromotion = functions.https.onCall(async (data, context) => {
  const { userUid, role } = data;
  if (!context.auth?.uid) {
    return 400;
  }
  const adminUid = context.auth?.uid;
  const adminSnap = await admin
    .firestore()
    .collection('users')
    .doc(adminUid)
    .get();

  if (!adminSnap.exists) {
    return { status: 400 };
  }
  const adminData = adminSnap.data();

  if (adminData?.user_role !== 'admin') {
    // eslint-disable-line
    return { status: 400 };
  }

  try {
    await admin.firestore().collection('users').doc(`${userUid}`).set(
      {
        user_role: role,
      },
      {
        merge: true,
      }
    );

    return { status: 200 };
  } catch (e: any) {
    return { status: 400 };
  }
});

export const deactivateAccount = functions.https.onCall(
  async (data, context) => {
    const { userUid, active } = data;

    if (!context.auth?.uid) {
      return;
    }

    const adminUid = context.auth?.uid;

    const adminSnap = await admin
      .firestore()
      .collection('users')
      .doc(adminUid)
      .get();

    const userSnap = await admin.firestore().collection('users').doc(userUid);

    if (!adminSnap.exists) {
      return { status: 400 };
    }
    const adminData = adminSnap.data();

    if (adminData?.user_role !== 'admin') {
      // eslint-disable-line
      return { status: 400 };
    }

    try {
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

      return { status: 200 };
    } catch (e) {
      return { status: 400 };
    }
  }
);

export const employeerUpdate = functions.firestore
  .document('employeer/{id}')
  .onUpdate((data, context) => {
    const employerId = context.params.id;

    if (!data.after.exists) {
      return;
    }
    const afterJob = data.after.data();

    const jobListings = admin
      .firestore()
      .collection('job_listing')
      .where('employer.id', '==', employerId)
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

async function isAdmin(user_uid: string): Promise<boolean> {
  const adminSnap = await admin
    .firestore()
    .collection('users')
    .doc(user_uid)
    .get();

  if (!adminSnap.exists) {
    return false;
  }
  const adminData = adminSnap.data();

  if (adminData?.user_role !== 'admin') {
    // eslint-disable-line
    return false;
  }
  return true;
}

export const applicationStatus = functions.https.onCall(async (data, context) => {
  const job_application_interested = admin.firestore().collectionGroup("job_applications").where("status", "==","interested").get()

  const job_application_contracted = admin.firestore().collectionGroup("job_applications").where("status", "==","contracted").get()

  const res = await Promise.all([job_application_interested, job_application_contracted]);
  
  
});
