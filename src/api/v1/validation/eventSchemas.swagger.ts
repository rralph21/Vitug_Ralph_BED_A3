/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *         - registrationCount
 *         - status
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique event identifier
 *           example: "123"
 *         name:
 *           type: string
 *           description: Event name (3-60 characters)
 *           minLength: 3
 *           maxLength: 60
 *           example: "Tech Conference 2024"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date in ISO 8601 format (must be future date)
 *           example: "2024-04-15T10:30:00Z"
 *         capacity:
 *           type: integer
 *           description: Maximum number of attendees (5-10000)
 *           minimum: 5
 *           maximum: 10000
 *           example: 500
 *         registrationCount:
 *           type: integer
 *           description: "Current registrations (0-capacity). When status is 'completed', must equal capacity."
 *           minimum: 0
 *           example: 250
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           description: Event status. Defaults to 'active'
 *           example: "active"
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *           description: Event category. Defaults to 'general'
 *           example: "conference"
 *
 *     CreateEventRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           description: Event name (3-60 characters)
 *           minLength: 3
 *           maxLength: 60
 *           example: "Tech Conference 2024"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date in ISO 8601 format (must be future)
 *           example: "2024-04-15T10:30:00Z"
 *         capacity:
 *           type: integer
 *           description: Maximum attendees (5-10000)
 *           minimum: 5
 *           maximum: 10000
 *           example: 500
 *         registrationCount:
 *           type: integer
 *           description: Current registrations. Defaults to 0. Must be <= capacity.
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           description: Event status. Defaults to 'active'
 *           example: "active"
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *           description: Event category. Defaults to 'general'
 *           example: "conference"
 *
 *     UpdateEventRequest:
 *       type: object
 *       description: "At least one field must be provided. registrationCount must be <= capacity. When status is 'completed', registrationCount must equal capacity."
 *       properties:
 *         name:
 *           type: string
 *           description: Event name (3-60 characters)
 *           minLength: 3
 *           maxLength: 60
 *           example: "Updated Conference"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date in ISO 8601 format (must be future)
 *           example: "2024-05-15T10:30:00Z"
 *         capacity:
 *           type: integer
 *           description: Maximum attendees (5-10000)
 *           minimum: 5
 *           maximum: 10000
 *           example: 750
 *         registrationCount:
 *           type: integer
 *           description: Current registrations. Must be <= capacity.
 *           minimum: 0
 *           example: 300
 *         status:
 *           type: string
 *           enum:
 *             - active
 *             - cancelled
 *             - completed
 *           description: Event status
 *           example: "active"
 *         category:
 *           type: string
 *           enum:
 *             - conference
 *             - workshop
 *             - meetup
 *             - seminar
 *             - general
 *           description: Event category
 *           example: "workshop"
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 */

// This file exports nothing; it only provides Swagger schema definitions
export {};
