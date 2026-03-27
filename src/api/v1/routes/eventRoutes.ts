import { Router } from "express";
import {
    getEvents,
    getEvent,
    getEventPopularity,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../controllers/eventControllers";

import { validateRequest } from "../middleware/validateRequest";
import { eventSchemas } from "../validation/eventValidation";

const router = Router();

router.get("/events", getEvents);


router.get(
    "/events/:id",
    validateRequest(eventSchemas.getById),
    getEvent
);

router.get(
    "/events/:id/popularity",
    validateRequest(eventSchemas.getById),
    getEventPopularity
);

router.post(
    "/events",
    validateRequest(eventSchemas.create),
    createEvent
);


router.put(
    "/events/:id",
    validateRequest(eventSchemas.update),
    updateEvent
);

router.delete("/events/:id", deleteEvent);

export default router;