
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBEmlIHwHtFtNmgo_DHYqtSDiLiD6b4Pk4",
    authDomain: "events-da2c8.firebaseapp.com",
    projectId: "events-da2c8",
    storageBucket: "events-da2c8.appspot.com",
    messagingSenderId: "368598512642",
    appId: "1:368598512642:web:3bc0c81fce6faa517c631b"
  };


const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth(app);

const db = getFirestore(app);
export  {storage, createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile , db , auth}
