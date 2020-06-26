import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfGmCQDVUrS-k2pZRPTEJtikizGn3PSRs",
  authDomain: "thefilmfactory-1e3dd.firebaseapp.com",
  databaseURL: "https://thefilmfactory-1e3dd.firebaseio.com",
  projectId: "thefilmfactory-1e3dd",
  storageBucket: "thefilmfactory-1e3dd.appspot.com",
  messagingSenderId: "892695161812",
  appId: "1:892695161812:web:34c97f278acddb7cec4441"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;