import { sampleEvent } from "../models/eventModels";
import { getAllEventsAsync } from "../repositories/eventRepositories";
import express, { Express } from "express";
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

export function createEvent(name: string, date: string, capacity: number) {
    const newId = event.length + 1;

    const newEvent: Event = {
        id: newId,
        name,
        date,
        capacity,
        registrationCount: 0,
    };

     event.push(newEvent);
  return newEvent;
}
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

export function deleteEvent(id: number) {
  const index = event.findIndex(e => e.id === id);

  if (index === -1) {
    return null;
  }

  const deletedEvent = event.splice(index, 1)[0];
  return deletedEvent;
}

    