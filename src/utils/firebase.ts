// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs} from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

class FirestoreService{ 
    db: any
    constructor(){
        this.db = getFirestore(app)
        
    }
   async addSubmissionDocument( data:object){
        try{
            var docRef = await addDoc(collection(this.db, "Waitlist"), data)
            console.log("User form succesfully saved to firestore", 'docRef id: ', docRef.id)
        }catch(e:any){
            console.log("Error saving user form to firestore: ", e.message)
        }
    }

    async getWaitlistSubmissionCount(): Promise<number>{
        try{
            const querySnapshot = await getDocs(collection(this.db, "Waitlist"));
            return querySnapshot.size
        }catch(e:any){
            console.log("Error getting waitlist submission count from firestore: ", e.message)
            return 0;
        }
    }
}

export { app, FirestoreService }