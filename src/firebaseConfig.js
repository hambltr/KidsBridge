import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr86xMeGwx843EgyZWrWm6H3ZOTgdo5RA",
  authDomain: "kidsbridge-d58cc.firebaseapp.com",
  projectId: "kidsbridge-d58cc",
  storageBucket: "kidsbridge-d58cc.appspot.com",
  messagingSenderId: "782204734897",
  appId: "1:782204734897:web:ea57b135de78d0dc224190"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };