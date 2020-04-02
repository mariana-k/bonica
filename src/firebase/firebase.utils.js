import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCLxkY7HFq2HTjX0kJHC4YZvD-zj1Ivzc0",
  authDomain: "bonica-db.firebaseapp.com",
  databaseURL: "https://bonica-db.firebaseio.com",
  projectId: "bonica-db",
  storageBucket: "bonica-db.appspot.com",
  messagingSenderId: "631413134981",
  appId: "1:631413134981:web:09523756ff9ea5da93bbec",
  measurementId: "G-8TFRRPXJEJ"
};

firebase.initializeApp(config);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
