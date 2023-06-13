
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import  "firebase/compat/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB_Dhxd7JZwkUTmcmaAA1DWcSvVRiTZwM4",
  authDomain: "chat-app-49514.firebaseapp.com",
  projectId: "chat-app-49514",
  storageBucket: "chat-app-49514.appspot.com",
  messagingSenderId: "77397883908",
  appId: "1:77397883908:web:b034f097e6330b40db8951",
  measurementId: "G-5TXKF092W4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }
export default firebase