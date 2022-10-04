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
  const { job_application, employeer } = data;

  let docRef = admin
    .firestore()
    .collection(`users/${uid}/job_applications`)
    .doc();

  let id = docRef.id;
  if (job_application.id) {
    id = job_application.id;
    docRef = admin
      .firestore()
      .collection(`users/${uid}/job_applications`)
      .doc(id);
  }

  docRef.set(job_application);

  admin
    .firestore()
    .collection(`employeers/${employeer.id}/job_applications`)
    .doc(id)
    .set(job_application, {
      merge: true,
    });
});

export const applicationUserDelete = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid) {
      return;
    }

    const uid = context.auth?.uid;
    const { employeer_id, job_application_id } = data;

    await admin
      .firestore()
      .collection(`users/${uid}/job_applications`)
      .doc(job_application_id)
      .delete();

    await admin
      .firestore()
      .collection(`employeers/${employeer_id}/job_applications`)
      .doc(job_application_id)
      .delete();
  }
)

export const userPromotion = functions.https.onCall((data, context) => {});
