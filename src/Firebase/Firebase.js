// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCkfEcQZeQYQV1AM9bzMRUh8s2XJsOIaQU",
//   authDomain: "portfolio-d62af.firebaseapp.com",
//   projectId: "portfolio-d62af",
//   storageBucket: "portfolio-d62af.appspot.com",
//   messagingSenderId: "907793760527",
//   appId: "1:907793760527:web:cf25e26320db605b48be7a"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAxuR-2mmdrtElfWmsNJpnlbl0GYFyYW40",
    authDomain: "eshop1-4bcce.firebaseapp.com",
    projectId: "eshop1-4bcce",
    storageBucket: "eshop1-4bcce.appspot.com",
    messagingSenderId: "664130715606",
    appId: "1:664130715606:web:13e40cd822e58ad75f6e77"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
export const Firestore = getFirestore(app);
export const Storage = getStorage(app)