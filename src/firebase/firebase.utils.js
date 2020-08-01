import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

console.log('this is firebase utils');
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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('errror creating user', error.message);
      }
    }

    return userRef;
    console.log(snapShot);
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;