// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

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

// NOT FINISHED: This only gets the first 20 comments. In a real app,
// you would implement pagination.
export async function fetchComments() {
  const snapshot = await getDocs(
    query(collection(db, "comments"), orderBy("date", "desc"), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}