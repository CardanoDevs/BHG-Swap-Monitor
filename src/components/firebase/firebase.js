import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyC_kA4ZrRBnj4-9_ZSaogeTmj93IQYUL5c",
  authDomain: "test-53bd6.firebaseapp.com",
  databaseURL: "https://test-53bd6-default-rtdb.firebaseio.com",
  projectId: "test-53bd6",
  storageBucket: "test-53bd6.appspot.com",
  messagingSenderId: "682312665243",
  appId: "1:682312665243:web:4e6b73139a2b8bd8105e3e",
  measurementId: "G-GTEYYWYGL8"
};

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
