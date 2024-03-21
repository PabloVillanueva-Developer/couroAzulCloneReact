import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPWJdJ3oZm59N44pd3-6XKMpiC2hJX_rA",
  authDomain: "coderreactprojectcouroazul.firebaseapp.com",
  databaseURL: "https://coderreactprojectcouroazul-default-rtdb.firebaseio.com",
  projectId: "coderreactprojectcouroazul",
  storageBucket: "coderreactprojectcouroazul.appspot.com",
  messagingSenderId: "97092226570",
  appId: "1:97092226570:web:78e42072a3e5e005a099f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) // enlazar Firebase con nuestro proyecto