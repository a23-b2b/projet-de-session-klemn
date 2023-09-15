// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { Firestore, getFirestore } from "firebase/firestore";




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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);



// function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('granted access')
//       const messaging = getMessaging(app);
//       getToken(messaging, {vapidKey: 'PbgCPZ5RSKNgAyO-4V8eP6RbOvxfcZ2zLhLSE6PF82o'})
//       .then((currentToken) =>{
//         if (currentToken) {
//           console.log('current toke' , currentToken);
//         }else{
//           console.log('Can not get token')
//         }
//       });
//           }
//   });
// }

// requestPermission();

