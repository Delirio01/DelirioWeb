import { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

type FirebaseConfigKey =
  | "apiKey"
  | "authDomain"
  | "projectId"
  | "storageBucket"
  | "messagingSenderId"
  | "appId";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim() ?? "",
};

const requiredFirebaseConfigEntries: Array<{ key: FirebaseConfigKey; envVar: string }> = [
  { key: "apiKey", envVar: "VITE_FIREBASE_API_KEY" },
  { key: "authDomain", envVar: "VITE_FIREBASE_AUTH_DOMAIN" },
  { key: "projectId", envVar: "VITE_FIREBASE_PROJECT_ID" },
  { key: "storageBucket", envVar: "VITE_FIREBASE_STORAGE_BUCKET" },
  { key: "messagingSenderId", envVar: "VITE_FIREBASE_MESSAGING_SENDER_ID" },
  { key: "appId", envVar: "VITE_FIREBASE_APP_ID" },
];

const missingFirebaseEnvVars = requiredFirebaseConfigEntries
  .filter(({ key }) => !firebaseConfig[key])
  .map(({ envVar }) => envVar);

if (missingFirebaseEnvVars.length > 0) {
  console.error(
    `[Firebase] Missing required env vars: ${missingFirebaseEnvVars.join(", ")}. ` +
      "Check your .env and restart the Vite dev server.",
  );
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

class FirestoreService {
  db: ReturnType<typeof getFirestore> | null;

  constructor() {
    this.db = null;
  }

  private ensureConfigured() {
    if (missingFirebaseEnvVars.length > 0) {
      throw new Error(`missing_firebase_env_vars:${missingFirebaseEnvVars.join(",")}`);
    }
  }

  private getDb() {
    this.ensureConfigured();
    if (this.db) {
      return this.db;
    }
    this.db = getFirestore(app);
    return this.db;
  }

  async addSubmissionDocument(data: object) {
    try {
      const docRef = await addDoc(collection(this.getDb(), "Waitlist"), data);
      console.log("User form successfully saved to firestore", "docRef id:", docRef.id);
    } catch (e: any) {
      console.error("Error saving user form to firestore:", e?.message ?? e);
      throw e;
    }
  }

  async getWaitlistSubmissionCount(): Promise<number> {
    try {
      const querySnapshot = await getDocs(collection(this.getDb(), "Waitlist"));
      return querySnapshot.size;
    } catch (e: any) {
      console.error("Error getting waitlist submission count from firestore:", e?.message ?? e);
      return 0;
    }
  }

  async addWarmNetworkSubmissionDocument(data: object): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.getDb(), "warmNetwork"), data);
      console.log("Warm network form successfully saved to firestore", "docRef id:", docRef.id);
      return docRef.id;
    } catch (e: any) {
      console.error("Error saving warm network form to firestore:", e?.message ?? e);
      throw e;
    }
  }
}

export { app, FirestoreService };
