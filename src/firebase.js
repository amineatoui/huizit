import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLWX3MhN_kMtBg9zyt6WZAy06aBwbLvrs",
  authDomain: "huizit-79e90.firebaseapp.com",
  projectId: "huizit-79e90",
  storageBucket: "huizit-79e90.appspot.com",
  messagingSenderId: "310561674556",
  appId: "1:310561674556:web:b1d35b4efd5cb76158ba39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
