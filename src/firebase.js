import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-TxZ2Yr_LEplANXYEEtmgHVImyHN2tTY",
    authDomain: "challenge-681e2.firebaseapp.com",
    projectId: "challenge-681e2",
    storageBucket: "challenge-681e2.appspot.com",
    messagingSenderId: "332827953690",
    appId: "1:332827953690:web:bc61118fa4d6ec408ddfa3",
    measurementId: "G-501LL627SE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); //firestore is the cloud-hosted, NoSQL database in firebase
  const auth = firebase.auth();

  export {db,auth};