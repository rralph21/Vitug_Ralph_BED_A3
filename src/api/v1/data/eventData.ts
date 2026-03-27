import { Event, Attendee } from "../../../api/v1/services/eventServices"

export const attendee: Attendee[] = [
    { id: 1, name: "Jordan Smith", email: "jordan.smith@email.com" },
    { id: 2, name: "Alex Chen", email: "alex.chen@email.com" }
]

export const event: Event[] = [
    { id: 1, name: "Tech Conference 2025", date: new Date().toISOString(), capacity: 200, registrationCount: 185 },
    { id: 2, name: "Startup Pitch Night", date: new Date().toISOString(), capacity: 50, registrationCount: 12 },
    { id: 3, name: "Web Dev Workshop", date: new Date().toISOString(), capacity: 30, registrationCount: 30 },
    { id: 4, name: "Eating coffee at Tostados", date: new Date().toISOString(), capacity: 4, registrationCount: 4},
]
