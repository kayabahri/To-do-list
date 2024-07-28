import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKjFCX4d1kTqLvZy2EbSA6WusxXdReCeo",
  authDomain: "todo-1b3a1.firebaseapp.com",
  projectId: "todo-1b3a1",
  storageBucket: "todo-1b3a1.appspot.com",
  messagingSenderId: "331517996829",
  appId: "1:331517996829:web:4fc719ed5e57af23213bf4",
  measurementId: "G-29KWPC6FQ2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
