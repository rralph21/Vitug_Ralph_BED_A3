import { Router } from "express";
import {
  getEvents,
  getEvent,
  getEventPopularity,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventControllers";


const router = Router();

router.get("/events", getEvents);
router.get("/events/:id", getEvent);
router.get("/events/:id/popularity", getEventPopularity);

router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;