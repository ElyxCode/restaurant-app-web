import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export {
  db,
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  query,
  updateDoc,
  where,
};
