import { db } from "../../../config/firebaseConfig";
import { sampleEvent } from "../models/eventModels";

// get all events async
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


// Creates a new event document in Firestore
export const createEventAsync = async (
    payload: Omit<sampleEvent, "createdAt" | "updatedAt">
): Promise<sampleEvent> => {
    const now = new Date().toISOString();

    const docRef = db.collection("events").doc();

    const newDoc: sampleEvent = {
        ...payload,
        createdAt: now,
        updatedAt: now,
    };

    await docRef.set(newDoc);

    return newDoc;
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