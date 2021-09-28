import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAy2JMax9fTZHqVmlFMavyCXrazf3iqGyc",
    authDomain: "gb-spa-react.firebaseapp.com",
    databaseURL: "https://gb-spa-react-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gb-spa-react",
    storageBucket: "gb-spa-react.appspot.com",
    messagingSenderId: "889034427479",
    appId: "1:889034427479:web:95cb797eddb4891c65a712"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
  await createUserWithEmailAndPassword(auth, email, pass);
}

export const login = async (email, pass) => {
  await signInWithEmailAndPassword(auth, email, pass);
};

export const signOut = async () => {
    await firebaseSignOut(auth);
}