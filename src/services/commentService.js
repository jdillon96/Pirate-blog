// Creates and fetches comments from firebase db outside of actual components (seperation of concerns)

import { db } from "../config/firebaseConfig"
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

export async function createComment({ name, text, articleId }) {
  const data = { name, text, date: Timestamp.now(), articleId }
  const docRef = await addDoc(collection(db, "comments"), data)
  return { id: docRef.id, ...data }
}

export async function fetchComments() {
  const snapshot = await getDocs(
    query(collection(db, "comments"), orderBy("date", "desc"), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}