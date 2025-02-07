// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTKQnOkHBsKVRpKllgl8ykpsFlGT-z9WU",
  authDomain: "netflix-gpt-38ab1.firebaseapp.com",
  projectId: "netflix-gpt-38ab1",
  storageBucket: "netflix-gpt-38ab1.firebasestorage.app",
  messagingSenderId: "346714786553",
  appId: "1:346714786553:web:996f24e1e4493c4df23028",
  measurementId: "G-3CPNSDF1ZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
