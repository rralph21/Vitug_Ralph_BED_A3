import express, { Express } from "express";

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

const attendee: Attendee[] = [
    { id: 1, name: "Jordan Smith", email: "jordan.smith@email.com" },
    { id: 2, name: "Alex Chen", email: "alex.chen@email.com" }
]

const event: Event[] = [
    { id: 1, name: "Tech Conference 2025", date: new Date().toISOString(), capacity: 200, registrationCount: 185 },
    { id: 2, name: "Startup Pitch Night", date: new Date().toISOString(), capacity: 50, registrationCount: 12 },
    { id: 3, name: "Web Dev Workshop", date: new Date().toISOString(), capacity: 30, registrationCount: 30 }
]

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

    