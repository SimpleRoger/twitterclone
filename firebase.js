// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS7MY-woD36IOj5YWCdzenxb1QjXK6zJg",
  authDomain: "twitter-clone-21dba.firebaseapp.com",
  projectId: "twitter-clone-21dba",
  storageBucket: "twitter-clone-21dba.appspot.com",
  messagingSenderId: "409959619117",
  appId: "1:409959619117:web:9e2d7ee8daffdf4e1136a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//database
export const db = getFirestore(  app)

export const auth = getAuth(app)
