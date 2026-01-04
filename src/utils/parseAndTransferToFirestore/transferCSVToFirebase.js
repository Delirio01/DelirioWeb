// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs} from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

import fs from 'fs'
import csv from 'csv-parser';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
/* config secrets / env vars */
};

/*

*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

class FirestoreService{ 
    constructor(){
        this.db = getFirestore(app)
        
    }
   async addSubmissionDocument( data){
        try{
            var docRef = await addDoc(collection(this.db, "Waitlist"), data)
            console.log("User form succesfully saved to firestore", 'docRef id: ', docRef.id)
        }catch(e){
            console.log("Error saving user form to firestore: ", e.message)
        }
    }

    async getWaitlistSubmissionCount(){
        try{
            const querySnapshot = await getDocs(collection(this.db, "Waitlist"));
            return querySnapshot.size
        }catch(e){
            console.log("Error getting waitlist submission count from firestore: ", e.message)
            return 0;
        }
    }
}

fs.createReadStream("waitlist.csv")
.pipe(csv())
.on('data', (data) =>{
    try{
        const firestoreService = new FirestoreService();
        const { Name, Email, Phone, Timestamp } = data; // Adjust based on your CSV structure
        firestoreService.addSubmissionDocument({
              "Timestamp":Timestamp,
            "Email": Email,
            "Name": Name,
            "Phone": Phone
        });
    }catch(e){
        console.log("Error parsing CSV data: ", e.message)
    }
 
})