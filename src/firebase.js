// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkvYHUOcF6xF6XoT_U_vZ1n6SmhxMknhc",
  authDomain: "react-firebase-realtor.firebaseapp.com",
  projectId: "react-firebase-realtor",
  storageBucket: "react-firebase-realtor.appspot.com",
  messagingSenderId: "180152184206",
  appId: "1:180152184206:web:efa3a16baf7792bf5fc8df"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()