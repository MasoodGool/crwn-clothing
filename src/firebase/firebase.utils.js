import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAm4XE6ZSMTaLF8YO1ixeHApSj2Y8Pse8I",
    authDomain: "crwn-db-d0110.firebaseapp.com",
    projectId: "crwn-db-d0110",
    storageBucket: "crwn-db-d0110.appspot.com",
    messagingSenderId: "935819255398",
    appId: "1:935819255398:web:4493556e6aba30715497a7",
    measurementId: "G-V6Z9MB9E1B"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.docs(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;