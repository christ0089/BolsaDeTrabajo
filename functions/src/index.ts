import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({ credential: admin.credential.applicationDefault() });

export const applicationUserCreate = functions.https.onCall((data, context) => {
  if (!context.auth?.uid) {
    return;
  }

  const uid = context.auth?.uid;
  const { jobApplication, employer } = data;

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
    const { employeerId, jobApplicationId } = data;

    await admin
      .firestore()
      .collection(`users/${uid}/job_applications`)
      .doc(jobApplicationId)
      .delete();

    await admin
      .firestore()
      .collection(`employeers/${employeerId}/job_applications`)
      .doc(jobApplicationId)
      .delete();
  }
);

export const userPromotion = functions.https.onCall((data, context) => {
  
});
