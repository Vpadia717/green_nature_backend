const firebase = require("firebase-admin");

// Initialize Firebase app with credentials

const serviceAccount = require("./green-nature-c535b-firebase-adminsdk-8d4lp-da559dd1d4.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://green-nature-c535b-default-rtdb.firebaseio.com/",
  projectId: "green-nature-c535b",
});

// Get a reference to the real-time database and Firestore database
const dbRealtime = firebase.database();
const dbFirestore = firebase.firestore();

module.exports = { dbFirestore, dbRealtime };
