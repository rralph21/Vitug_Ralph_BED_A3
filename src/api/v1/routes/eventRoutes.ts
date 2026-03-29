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

<<<<<<< HEAD
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

=======
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events is collected"
 *                 count:
 *                   type: number
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 */
router.get("/events", getEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event with validation. Required fields are name, date, and capacity.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventRequest'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 */
>>>>>>> feature
router.post(
    "/events",
    validateRequest(eventSchemas.create),
    createEvent
);

<<<<<<< HEAD

=======
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a specific event
 *     description: Retrieve a single event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event is collected"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get(
    "/events/:id",
    validateRequest(eventSchemas.getById),
    getEvent
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Update an existing event. At least one field must be provided.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event updated"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
>>>>>>> feature
router.put(
    "/events/:id",
    validateRequest(eventSchemas.update),
    updateEvent
);

<<<<<<< HEAD
router.delete("/events/:id", deleteEvent);

=======
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Delete an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted"
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/events/:id", deleteEvent);

/**
 * @swagger
 * /events/{id}/popularity:
 *   get:
 *     summary: Get event popularity
 *     description: Get popularity metrics for a specific event including popularity score and tier
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Popularity data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event popularity calculated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     capacity:
 *                       type: number
 *                     registrationCount:
 *                       type: number
 *                     spotsRemaining:
 *                       type: number
 *                     popularityScore:
 *                       type: number
 *                     popularityTier:
 *                       type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get(
    "/events/:id/popularity",
    validateRequest(eventSchemas.getById),
    getEventPopularity
);

>>>>>>> feature
export default router;