import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoWtRmNMgakcprUiAWtZY3nKjPK_aa_LI",
  authDomain: "smart-vending-machine-9807f.firebaseapp.com",
  databaseURL: "https://smart-vending-machine-9807f-default-rtdb.firebaseio.com",
  projectId: "smart-vending-machine-9807f",
  storageBucket: "smart-vending-machine-9807f.appspot.com",
  messagingSenderId: "1059583239464",
  appId: "1:1059583239464:web:b097efbca2beae3a7b5c1d",
  measurementId: "G-X5FJSN2FQP"
};

const app = initializeApp(firebaseConfig);
const fs = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export {auth,fs,storage}
