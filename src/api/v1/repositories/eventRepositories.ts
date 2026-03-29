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

<<<<<<< HEAD
    const docRef = db.collection("events").doc();
=======
    // Use the event's ID as the Firestore document ID for consistency
    const docRef = db.collection("events").doc(payload.id);
>>>>>>> feature

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
    if (docSnap.exists) return docSnap.data() as sampleEvent;

    const querySnap = await db.collection("events").where("id", "==", id).limit(1).get();
    if (querySnap.empty) return null;

    return querySnap.docs[0].data() as sampleEvent;
};

// update event

const findEventDocRefByEventId = async (eventId: string) => {
   
    const directRef = db.collection("events").doc(eventId);
    const directSnap = await directRef.get();
    if (directSnap.exists) return directRef;

    const snap = await db.collection("events").where("id", "==", eventId).limit(1).get();
    if (snap.empty) return null;

    return snap.docs[0].ref;
};

export const updateEventByIdAsync = async (
    eventId: string,
    patch: Partial<sampleEvent>
): Promise<sampleEvent | null> => {
    const ref = await findEventDocRefByEventId(eventId);
    if (!ref) return null;

    const docSnap = await ref.get();
    const existing = docSnap.data() as sampleEvent;

    const updated: sampleEvent = {
        ...existing,
        ...patch,
        updatedAt: new Date().toISOString(),
    };

    if (updated.registrationCount > updated.capacity) return null;

    await ref.set(updated, { merge: false });
    return updated;
};

// delete event

export const deleteEventByIdAsync = async (eventId: string): Promise<sampleEvent | null> => {
    const ref = await findEventDocRefByEventId(eventId);
    if (!ref) return null;

    const snap = await ref.get();
    const existing = snap.data() as sampleEvent;

    await ref.delete();
    return existing;
};