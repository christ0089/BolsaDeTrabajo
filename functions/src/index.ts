import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({credential: admin.credential.applicationDefault()});

export const applicatonEmployeerCreate = functions.https.onCall(
    async (data, context) => {
      if (!context.auth?.uid) {
        return {status: 400};
      }

      const uid = context.auth?.uid;
      const {jobApplication, employer} = data;

      if ((await isAdminRole(uid)) == false) {
        logger("Not admin", "ERROR");
        return {status: 400};
      }

      const userUid = jobApplication.personal_data.id;
      let docRef = admin
          .firestore()
          .collection(`users/${userUid}/job_applications`)
          .doc();

      let id = docRef.id;

      try {
        if (jobApplication.id) {
          id = jobApplication.id;
          docRef = admin
              .firestore()
              .collection(`users/${userUid}/job_applications`)
              .doc(id);
        }

        await docRef.set(jobApplication);

        await admin
            .firestore()
            .collection(`employeers/${employer.id}/job_applications`)
            .doc(id)
            .set({
              ...jobApplication,
              updateDate: firestore.Timestamp.now(),
            }, {
              merge: true,
            });

        // eslint-disable-next-line
      await admin
            .firestore()
            .collection(`employeers/${employer.id}/general_applicants`)
            .doc(id)
            .set({
              ...jobApplication.personal_data,
              updateDate: firestore.Timestamp.now(),
            }, {
              merge: true,
            });

        await admin
            .firestore()
            .doc(`job_listing/${jobApplication.job_position.id}`)
            .update({applicants: firestore.FieldValue.increment(1)});

        return {status: 200};
      } catch (e: any) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

export const applicationUserCreate = functions.https.onCall(
    async (data, context) => {
      if (!context.auth?.uid) {
        return {status: 400};
      }

      const uid = context.auth?.uid;
      const {jobApplication, employer} = data;

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
            .doc(`job_listing/${jobApplication.job_position.id}`)
            .update({applicants: firestore.FieldValue.increment(1)});

        return {status: 200};
      } catch (e: any) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

export const applicationUserUpdate = functions.https.onCall(
    async (data, context) => {
      if (!context.auth?.uid) {
        return {status: 400};
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
        return {status: 400};
      }

      const employeeApplicationData = employeeApplicationRef.data();

    if (employeeApplicationData?.personal_data.uid !== uid) { // eslint-disable-line
        return {status: 400};
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

        return {status: 200};
      } catch (e: any) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

export const jobApplicationEmployeerUpdate = functions.https.onCall(
    async (data, context) => {
      const {employeerId, contractDate, jobApplication, status} = data;

      if (!context.auth?.uid) {
        logger("Not logged in", "ERROR");
        return {status: 400};
      }

      const adminUid = context.auth?.uid;

      if ((await isAdminRole(adminUid)) == false) {
        logger("Not admin", "ERROR");
        return {status: 400, message: "No se tiene privelegio"};
      }

    const date = new firestore.Timestamp(contractDate.seconds, contractDate.nanoseconds) // eslint-disable-line
      try {
        const job = await admin
            .firestore()
            .doc(`employeers/${jobApplication.employer.id}`)
            .get();

        const jobData = job.data();

        if (!jobData) {
          return {status: 400};
        }

      if (((jobData.owner as string[]).indexOf(adminUid) > -1 && await isEmployeerRole(adminUid)) || await isSuperAdmin(adminUid)) { // eslint-disable-line
        } else {
          return {status: 400, message: "No se tiene privelegio"};
        }


        const companyName = jobApplication.employer.company_name;
        await admin
            .firestore()
        .collection(`users/${jobApplication.personal_data.id}/inbox`) // eslint-disable-line
            .add({
              components: [companyName],
              status: status,
              viewed: false,
          contractDate: date, // eslint-disable-line
              createdAt: firestore.Timestamp.now(),
              updated: firestore.Timestamp.now(),
            });
        await admin
            .firestore()
            .collection(`employeers/${employeerId}/job_applications`)
            .doc(jobApplication.id)
            .set(
                {
                  status,
                  contractDate: date,
                  updated: firestore.Timestamp.now(),
                },
                {
                  merge: true,
                }
            );
        await admin
            .firestore()
        .collection(`users/${jobApplication.personal_data.id}/job_applications`) // eslint-disable-line
            .doc(jobApplication.id)
            .set(
                {
                  status,
                  contractDate: date,
                  updated: firestore.Timestamp.now(),
                },
                {
                  merge: true,
                }
            );
        return {status: 200};
      } catch (e: any) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

type ServerityLogger = "NOTICE" | "WARNING" | "ERROR";
const logger = (message: any, severity: ServerityLogger) => {
  const globalLogFields = {};

  const entry = Object.assign(
      {
        severity,
        message: `${message}`,
        // Log viewer accesses 'component' as 'jsonPayload.component'.
        component: "arbitrary-property",
      },
      globalLogFields
  );

  console.log(JSON.stringify(entry));
};

export const jobListingEmployeerUpdate = functions.https.onCall(
    async (data, context) => {
      if (!context.auth?.uid) {
        logger("Not logged in", "ERROR");
        return {status: 400};
      }

      const adminUid = context.auth?.uid;

      if ((await isAdminRole(adminUid)) == false) {
        logger("Not admin", "ERROR");
        return {status: 400};
      }
      const {jobApplicationId, closingReason} = data;

      try {
        await admin
            .firestore()
            .collection("job_listing")
            .doc(jobApplicationId)
            .set(
                {
                  closing_reason: closingReason,
                  updatedAt: firestore.Timestamp.now(),
                  active: false,
                },
                {
                  merge: true,
                }
            );

        return {status: 200};
      } catch (e: any) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

export const userPromotion = functions.https.onCall(async (data, context) => {
  const {userUid, role} = data;
  if (!context.auth?.uid) {
    return {status: 400};
  }
  const adminUid = context.auth?.uid;
  const adminSnap = await admin
      .firestore()
      .collection("users")
      .doc(adminUid)
      .get();

  if (!adminSnap.exists) {
    return {status: 400};
  }
  const adminData = adminSnap.data();

  if (adminData?.user_role !== "admin") { // eslint-disable-line
    return {status: 400};
  }

  try {
    await admin.firestore().collection("users").doc(`${userUid}`).set(
        {
          user_role: role,
        },
        {
          merge: true,
        }
    );

    return {status: 200};
  } catch (e: any) {
    logger(e, "ERROR");
    return {status: 400};
  }
});

export const deactivateAccount = functions.https.onCall(
    async (data, context) => {
    const { user_uid } = data;  // eslint-disable-line

      if (!context.auth?.uid) {
        return;
      }

      const adminUid = context.auth?.uid;

      const adminSnap = await admin
          .firestore()
          .collection("users")
          .doc(adminUid)
          .get();

    const userSnap = await admin.firestore().collection("users").doc(user_uid); // eslint-disable-line

      if (!adminSnap.exists) {
        logger("Admin does not exist", "ERROR");
        return {status: 400};
      }
      const adminData = adminSnap.data();

    if (adminData?.user_role !== "admin") { // eslint-disable-line
        logger("Is not and Admin user", "ERROR");
        return {status: 400};
      }

      try {
        const user = await admin.auth().getUser(user_uid);
        await admin.auth().updateUser(user_uid, {
          disabled: !user.disabled,
        });

        await userSnap.set(
            {
              disabled: !user.disabled,
            },
            {
              merge: true,
            }
        );

        // TODO: update all companies the user is owner to inactive

        return {status: 200};
      } catch (e) {
        logger(e, "ERROR");
        return {status: 400};
      }
    }
);

export const employeerUpdate = functions.firestore
    .document("employeers/{id}")
    .onUpdate(async (res, context) => {
      const employerId = context.params.id;

      if (!res.after.exists) {
        return;
      }

      console.log(res.after.data());
      const afterJob = res.after.data();

      const jobListings = admin
          .firestore()
          .collection("job_listing")
          .where("employer.id", "==", employerId)
          .get();


      return jobListings.then((docs) => {
        const promises = docs.docs.map((doc) => {
          const docData = doc.data();
          return doc.ref.set(
              {
                active: docData.active == false ? false : afterJob.active,
                employer: {
                  company_name: afterJob.company_name,
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

/**
 * Checks wether a user has the ability to edit data
 *
 * @param {string} userUid - Description of the parameter.
 * @return {boolean} Description of the return value.
 */
async function isAdminRole(userUid: string): Promise<boolean> {
  const adminSnap = await admin
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();

  if (!adminSnap.exists) {
    return false;
  }
  const adminData = adminSnap.data();

  // eslint-disable-next-line
  const isAdmin = adminData?.user_role == "admin";
  // eslint-disable-next-line
  const isEmployer = adminData?.user_role == "employeer";
  if (isAdmin || isEmployer) {
    return true;
  }
  return false;
}

/**
 * Checks wether a user has the ability to edit data
 *
 * @param {string} userUid - Description of the parameter.
 * @return {boolean} Description of the return value.
 */
async function isSuperAdmin(userUid: string): Promise<boolean> {
  const adminSnap = await admin
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();

  if (!adminSnap.exists) {
    return false;
  }
  const adminData = adminSnap.data();

  // eslint-disable-next-line
  const isAdmin = adminData?.user_role == "admin";
  return isAdmin;
}
/**
 * Checks wether a user has the ability to edit data
 *
 * @param {string} userUid - Description of the parameter.
 * @return {boolean} Description of the return value.
 */
async function isEmployeerRole(userUid: string): Promise<boolean> {
  const adminSnap = await admin
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();

  if (!adminSnap.exists) {
    return false;
  }
  const adminData = adminSnap.data();

  const isEmployer = adminData?.user_role == "employeer"; // eslint-disable-line
  if (isEmployer) {
    return true;
  }
  return false;
}

export const applicationStatusReport = functions.https.onCall(
    async (data, context) => {
      const minDate = data.min_date;
      const maxDate = data.max_date;

      const jobListingReport = await admin
          .firestore()
          .collection("job_listing")
          .orderBy("createdAt", "desc")
          .where("createdAt", ">=", new Date(minDate))
          .where("createdAt", "<=", new Date(maxDate))
          .get();

      const res = await Promise.all([jobListingReport]);

      return res.map((docs) => {
        const data = docs.docs.map((doc) => {
          const job = doc.data();
          return {
            id: doc.id,
            ...job,
          };
        });
        return data;
      });
    }
);

export const employeerCreationReport = functions.https.onCall(
    async (data, context) => {
      const minDate = data.min_date;
      const maxDate = data.max_date;


      if (!context.auth) {
        return [];
      }


      const employeers = admin
          .firestore()
          .collection("employeers")
          .orderBy("createdAt", "desc")
          .where("createdAt", ">=", new Date(minDate))
          .where("createdAt", "<=", new Date(maxDate))
          .get();

      const res = await Promise.all([employeers]);
      return res.map((docs) => {
        const data = docs.docs.map((doc) => {
          const job = doc.data();
          return {
            id: doc.id,
            ...job,
          };
        });
        return data;
      });
    }
);

export const userCreationReport = functions.https.onCall(
    async (data, context) => {
      const minDate = data.min_date;
      const maxDate = data.max_date;


      if (!context.auth) {
        return [];
      }


      const employeers = admin
          .firestore()
          .collection("users")
          .orderBy("createdAt", "desc")
          .where("createdAt", ">=", new Date(minDate))
          .where("createdAt", "<=", new Date(maxDate))
          .get();

      const res = await Promise.all([employeers]);
      return res.map((docs) => {
        const data = docs.docs.map((doc) => {
          const job = doc.data();
          return {
            id: doc.id,
            ...job,
          };
        });
        return data;
      });
    }
);


export const hiringReport = functions.https.onCall(async (data, context) => {
  const minDate = data.min_date;
  const maxDate = data.max_date;


  if (!context.auth) {
    return [];
  }


  const jobApplicationContracted = admin
      .firestore()
      .collectionGroup("job_applications")
      .where("status", "==", "contracted")
      .where("contractDate", ">=", new Date(minDate))
      .where("contractDate", "<=", new Date(maxDate))
      .get();

  const jobApplicationDismissed = admin
      .firestore()
      .collectionGroup("job_applications")
      .where("status", "==", "dismissed")
      .where("contractDate", ">=", new Date(minDate))
      .where("contractDate", "<=", new Date(maxDate))
      .get();

  const promise = [jobApplicationContracted, jobApplicationDismissed];


  const res = await Promise.all(promise);
  console.log(res[0].docs.length);
  console.log(res[1].docs.length);
  return res.map((docs) => {
    const data = docs.docs.map((doc) => {
      const job = doc.data();
      return {
        id: doc.id,
        ...job,
      };
    });
    return data;
  });
});
