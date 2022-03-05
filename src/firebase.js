import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDGoCF_Q_H8tBt99fxVgAfOXIDQrCl1eyA",
  authDomain: "ahorasi-88a02.firebaseapp.com",
  databaseURL: "https://ahorasi-88a02.firebaseio.com",
  projectId: "ahorasi-88a02",
  storageBucket: "ahorasi-88a02.appspot.com",
  messagingSenderId: "81281434621",
  appId: "1:81281434621:web:51e720a9d4f43e9fb08f94",
  measurementId: "G-TJ57YE8PPR"
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const storage = firebase.storage();

export { auth, provider, twitterProvider, storage };
export default db;
