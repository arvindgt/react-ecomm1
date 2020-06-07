import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDhRFnTJfWpkalMo5z2kordMx8N4nepu8A",
    authDomain: "crown-db-a7743.firebaseapp.com",
    databaseURL: "https://crown-db-a7743.firebaseio.com",
    projectId: "crown-db-a7743",
    storageBucket: "crown-db-a7743.appspot.com",
    messagingSenderId: "242663773590",
    appId: "1:242663773590:web:0b33e162bd5f0e8dda39b7",
    measurementId: "G-S9XRWCT6Z5"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;