// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAUtx6KHwKpb92cGggYdRnMc6tN8CPF79g",
  authDomain: "myblog-65c5c.firebaseapp.com",
  projectId: "myblog-65c5c",
  storageBucket: "myblog-65c5c.appspot.com",
  messagingSenderId: "688761597649",
  appId: "1:688761597649:web:4bda40b95d4f156213dff0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }