const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins" };
  }
  return admin
    .auth()
    .setCustomUserClaims(data.uid, {
      admin: true,
    })
    .then((user) => {
      return {
        message: `Success! ${data.uid} has been made an admin`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.disableAccount = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add disable accounts" };
  }

  return admin
    .auth()
    .updateUser(data.uid, {
      disabled: true,
    })
    .then((user) => {
      return {
        message: `Success! ${data.uid} has been disabled`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.enableAccount = functions.https.onCall((data, context) => {
    if (context.auth.token.admin !== true) {
      return { error: "Only admins can add enable accounts" };
    }
  
    return admin
      .auth()
      .updateUser(data.uid, {
        disabled: false,
      })
      .then((user) => {
        return {
          message: `Success! ${data.uid} has been enabled`,
        };
      })
      .catch((err) => {
        return err;
      });
  });
