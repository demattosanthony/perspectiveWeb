import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYbyiMpikEPMyBpO_XQFEc_Rrld-s9geM",
  authDomain: "perspective-3adcf.firebaseapp.com",
  databaseURL: "https://perspective-3adcf.firebaseio.com",
  projectId: "perspective-3adcf",
  storageBucket: "perspective-3adcf.appspot.com",
  messagingSenderId: "306910425503",
  appId: "1:306910425503:web:558afae58519286fa50daa",
  measurementId: "G-RQ16JDKMY8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const appleSignInProvider = new firebase.auth.OAuthProvider("apple.com");
const googleSignInProvider = new firebase.auth.GoogleAuthProvider();

export { auth, appleSignInProvider, googleSignInProvider };
