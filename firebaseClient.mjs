// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {getFirestore} from "firebase/firestore";

let apiKey="AIzaSyAJ2GezvcmjOwZwmcufcH1WyNtlZqRgD5Y"
let appId="1:295192797328:web:1af1909290fef7e9e63815"
let messagingSenderId="295192797328"


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

(async function(){
  console.log("hiiiii")
try{
  let userCredential = await firebase.auth().signInWithEmailAndPassword("ishans@dal.ca", "12345678");
  let currentUser = auth.currentUser
  let idToken = currentUser ? await currentUser.getIdToken(): null;
  console.log(idToken);
}catch(error){
  var errorCode = error.code;
  var errorMessage = error.message;
  // ..
}
})();


