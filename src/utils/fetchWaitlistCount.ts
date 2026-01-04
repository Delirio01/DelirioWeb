// Utility to fetch the waitlist count from Firestore
import { getFirestore, collection, getCountFromServer } from "firebase/firestore";
import { app } from "./firebase";

export async function fetchWaitlistCount(): Promise<number> {
  try {
    const db = getFirestore(app);
    const coll = collection(db, "Waitlist");
    // getCountFromServer is efficient and does not download all docs
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count || 0;
  } catch {
    return 100; // fallback
  }
}