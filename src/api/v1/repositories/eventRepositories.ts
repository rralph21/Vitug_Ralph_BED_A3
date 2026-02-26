import { db } from "../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";

const addDocument = async (): Promise<void> => {
    // Create a reference to a document in the 'users' collection with ID 'user1'
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("users").doc("user1");

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    await docRef.set({
        name: "John Doe",
        email: "john@example.com",
        age: 30,
    });
    console.log("Document added");
};