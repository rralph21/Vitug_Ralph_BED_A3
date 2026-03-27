import Joi from "joi";

const STATUS_VALUES = ["active", "cancelled", "completed"] as const;
const CATEGORY_VALUES = ["conference", "workshop", "meetup", "seminar", "general"] as const;

export const eventSchemas = {
    // POST /events
    create: {
        body: Joi.object({
            name: Joi.string().min(3).max(60).required().messages({
                "any.required": '"name" is required',
                "string.base": '"name" must be a string',
                "string.empty": '"name" is required',
                "string.min": '"name" length must be at least 3 characters long',
                "string.max": '"name" length must be less than or equal to 60 characters long',
            }),

            date: Joi.date().iso().greater("now").required().messages({
                "any.required": '"date" is required',
                "date.base": '"date" must be a valid ISO date',
                "date.format": '"date" must be a valid ISO date',
                "date.greater": '"date" must be greater than "now"',
            }),

            capacity: Joi.number().integer().min(5).max(10000).required().messages({
                "any.required": '"capacity" is required',
                "number.base": '"capacity" must be a number',
                "number.integer": '"capacity" must be an integer',
                "number.min": '"capacity" must be greater than or equal to 5',
                "number.max": '"capacity" must be less than or equal to 10000',
            }),

            registrationCount: Joi.number()
                .integer()
                .min(0)
                .default(0)
                .max(Joi.ref("capacity"))
                .messages({
                    "number.base": '"registrationCount" must be a number',
                    "number.integer": '"registrationCount" must be an integer',
                    "number.min": '"registrationCount" must be greater than or equal to 0',
                    "number.max": '"registrationCount" must be less than or equal to ref:capacity',
                }),

            status: Joi.string()
                .valid(...STATUS_VALUES)
                .default("active")
                .messages({
                    "string.base": '"status" must be a string',
                    "any.only": `"status" must be one of [${STATUS_VALUES.join(", ")}]`,
                }),

            category: Joi.string()
                .valid(...CATEGORY_VALUES)
                .default("general")
                .messages({
                    "string.base": '"category" must be a string',
                    "any.only": `"category" must be one of [${CATEGORY_VALUES.join(", ")}]`,
                }),
        })
            .custom((value, helpers) => {
                if (value.status === "completed" && value.registrationCount !== value.capacity) {
                    return helpers.error("any.custom", {
                        message: '"registrationCount" must equal "capacity" when status is "completed"',
                    });
                }
                return value;
            })
            .messages({
                "any.custom": "{{#message}}",
            }),
    },

    // GET /events/:id
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": '"id" is required',
                "string.empty": '"id" is required',
            }),
        }),
    },

    // PUT /events/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": '"id" is required',
                "string.empty": '"id" is required',
            }),
        }),

        body: Joi.object({
            name: Joi.string().min(3).max(60).optional().messages({
                "string.base": '"name" must be a string',
                "string.min": '"name" length must be at least 3 characters long',
                "string.max": '"name" length must be less than or equal to 60 characters long',
            }),

            date: Joi.date().iso().greater("now").optional().messages({
                "date.base": '"date" must be a valid ISO date',
                "date.format": '"date" must be a valid ISO date',
                "date.greater": '"date" must be greater than "now"',
            }),

            capacity: Joi.number().integer().min(5).max(10000).optional().messages({
                "number.base": '"capacity" must be a number',
                "number.integer": '"capacity" must be an integer',
                "number.min": '"capacity" must be greater than or equal to 5',
                "number.max": '"capacity" must be less than or equal to 10000',
            }),

            registrationCount: Joi.number().integer().min(0).optional().messages({
                "number.base": '"registrationCount" must be a number',
                "number.integer": '"registrationCount" must be an integer',
                "number.min": '"registrationCount" must be greater than or equal to 0',
            }),

            status: Joi.string().valid(...STATUS_VALUES).optional().messages({
                "any.only": `"status" must be one of [${STATUS_VALUES.join(", ")}]`,
            }),

            category: Joi.string().valid(...CATEGORY_VALUES).optional().messages({
                "any.only": `"category" must be one of [${CATEGORY_VALUES.join(", ")}]`,
            }),
        })
            .min(1)
            .custom((value, helpers) => {
                if (
                    value.capacity !== undefined &&
                    value.registrationCount !== undefined &&
                    value.registrationCount > value.capacity
                ) {
                    return helpers.error("any.custom", {
                        message: '"registrationCount" must be less than or equal to ref:capacity',
                    });
                }

                if (
                    value.status === "completed" &&
                    value.capacity !== undefined &&
                    value.registrationCount !== undefined &&
                    value.registrationCount !== value.capacity
                ) {
                    return helpers.error("any.custom", {
                        message: '"registrationCount" must equal "capacity" when status is "completed"',
                    });
                }

                return value;
            })
            .messages({
                "object.min": "At least one field must be provided",
                "any.custom": "{{#message}}",
            }),
    },

    // GET /events
    list: {
        query: Joi.object({
            status: Joi.string().valid(...STATUS_VALUES).optional(),
            category: Joi.string().valid(...CATEGORY_VALUES).optional(),
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10),
        }),
    },
};