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

// get event by id
export const getEventByIdAsync = async (id: string): Promise<sampleEvent | null> => {
  const docSnap = await db.collection("events").doc(id).get();

  if (!docSnap.exists) return null;

  return docSnap.data() as sampleEvent;
};