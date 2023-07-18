// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { apiKey,appId,messagingSenderId } from '@env'
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(apiKey)
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "csci-5409-s23.firebaseapp.com",
  projectId: "csci-5409-s23",
  storageBucket: "csci-5409-s23.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}
// Initialize Firebase
const db = getFirestore(app);
const auth = firebase.auth();

export  { auth, db };