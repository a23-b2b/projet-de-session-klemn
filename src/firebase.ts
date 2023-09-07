// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT-4SCTxWpNfnip_hiQmO_9lO3FHgxFJo",
  authDomain: "klemn-702af.firebaseapp.com",
  projectId: "klemn-702af",
  storageBucket: "klemn-702af.appspot.com",
  messagingSenderId: "143757651057",
  appId: "1:143757651057:web:b27f6ad1a341830a143fd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

