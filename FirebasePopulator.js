const admin = require('firebase-admin');

const serviceAccount = require('./se3316-aruan4-lab4-firebase-adminsdk-69m20-a0bef87130.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "se3316-aruan4-lab4.firebaseapp.com",
});

const fs = require('fs');

//Input the JSON file
const jsonData = require('./superhero_powers.json');

const db = admin.firestore();

//Name the collection
const collection = db.collection('superhero_powers');

//Add each document from the JSON file to Firestore
jsonData.forEach((docData) => {
  collection.add(docData);
});

console.log('Data added to Firestore successfully.');