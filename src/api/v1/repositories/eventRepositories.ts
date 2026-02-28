import { db } from "../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { sampleEvent } from "../models/eventModels";


export const getAllEventsAsync = async (): Promise<sampleEvent[]> => {
  const snapshot = await db.collection("events").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as any;

    return {
      id: data.id ?? doc.id,
      name: data.name,
      date: data.date,
      capacity: Number(data.capacity),
      registrationCount: Number(data.registrationCount),
      status: data.status,
      category: data.category,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  });
};

// export const addDocument = async (): Promise<void> => {
//     // Create a reference to a document in the 'users' collection with ID 'user1'
//     // If the document doesn't exist, it will be created
//     const docRef: DocumentReference = db.collection("events").doc("event1");

//     // Use the `set` method to add or overwrite data in the document
//     // The data is passed as an object with fields and their values
//     await docRef.set({
//         name: "John Doe",
//         email: "john@example.com",
//         age: 30,
//     });
//     console.log("Document added");