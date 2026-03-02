import { sampleEvent } from "../models/eventModels";
import { getAllEventsAsync, createEventAsync, getEventByIdAsync, updateEventByIdAsync } from "../repositories/eventRepositories";
import { event } from "../data/eventData"


export interface Attendee {
    id: number;
    name: string;
    email: string;
}

export interface Event {
    id: number;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
}

// calculates popularity based on capacityu and registrationCount
export function popularityScore(capacity: number, registrationCount: number) {
    if (capacity === 0) {
        return {
            score: 0,
            tier: "new"
        };
    }

    const beforeScore = (registrationCount / capacity) * 100;

    const afterScore = Math.round(beforeScore * 10) / 10;

    let tier = "New";

    if (afterScore >= 90) {
        tier = "Hot";
    } else if (afterScore >= 70) {
        tier = "Popular";
    } else if (afterScore >= 50) {
        tier = "Moderate";
    } else if (afterScore >= 25) {
        tier = "Building";
    } else {
        tier = "New";
    }

    return {
        afterScore,
        tier
    };
}

export function getAllEvents() {
    return event;
}

// get all event function from firestore
export const getAllEventsDb = async (): Promise<sampleEvent[]> => {
    return getAllEventsAsync();
};


export function getEventById(id: number) {
    return event.find(e => e.id === id);
}

export const getEventByIdDb = async (id: string): Promise<sampleEvent | null> => {
    return getEventByIdAsync(id);
};

// creating an event async
export const createEventDb = async (
    name: string,
    date: string,
    capacity: number,
    registrationCount = 0,
    status = "active",
    category = "general"
): Promise<sampleEvent> => {
    const id = `evt_${Date.now()}`;

    return createEventAsync({
        id,
        name,
        date,
        capacity,
        registrationCount,
        status,
        category,
    });
};

export function updateEvent(id: number, data: any) {
    const event = getEventById(id);

    if (!event) {
        return null;
    }

    if (data.name !== undefined) {
        event.name = data.name;
    }

    if (data.date !== undefined) {
        event.date = data.date;
    }

    if (data.capacity !== undefined) {
        event.capacity = Number(data.capacity);
    }

    if (data.registrationCount !== undefined) {
        event.registrationCount = Number(data.registrationCount);
    }

    return event;
}

// update event async
export const updateEventDb = async (
    id: string,
    data: any
): Promise<sampleEvent | null> => {
    const patch: Partial<sampleEvent> = {};

    if (data.name !== undefined) patch.name = String(data.name);
    if (data.date !== undefined) patch.date = String(data.date);

    if (data.capacity !== undefined) patch.capacity = Number(data.capacity);
    if (data.registrationCount !== undefined)
        patch.registrationCount = Number(data.registrationCount);

    if (data.status !== undefined) patch.status = String(data.status);
    if (data.category !== undefined) patch.category = String(data.category);

    return updateEventByIdAsync(id, patch);
};

export function deleteEvent(id: number) {
    const index = event.findIndex(e => e.id === id);

    if (index === -1) {
        return null;
    }

    const deletedEvent = event.splice(index, 1)[0];
    return deletedEvent;
}

