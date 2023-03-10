// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnm2unxmCrPEoTc4zn9mEfRr6r1pS4R5E",
  authDomain: "mevnprojekti.firebaseapp.com",
  projectId: "mevnprojekti",
  storageBucket: "mevnprojekti.appspot.com",
  messagingSenderId: "913077148321",
  appId: "1:913077148321:web:25fa3d78547a4f091faee0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;