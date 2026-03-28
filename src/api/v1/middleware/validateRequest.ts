import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constant/httpConstant";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
) => {
    const defaultOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options,
    };

    return (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = [];

        const validatePart = (
            schema: ObjectSchema,
            data: any,
            partName: string,
            shouldStrip: boolean
        ) => {
            const { error, value } = schema.validate(data, {
                abortEarly: true, 
                stripUnknown: shouldStrip,
                convert: true,  
            });

            if (error) {
                errors.push(`${partName}: ${error.details[0].message}`);
                return data;
            }

            return shouldStrip ? value : data;
        };

        if (schemas.body) {
            req.body = validatePart(
                schemas.body,
                req.body,
                "Body",
                defaultOptions.stripBody
            );
        }

        if (schemas.params) {
            req.params = validatePart(
                schemas.params,
                req.params,
                "Params",
                defaultOptions.stripParams
            );
        }

        if (schemas.query) {
            req.query = validatePart(
                schemas.query,
                req.query,
                "Query",
                defaultOptions.stripQuery
            );
        }

        if (errors.length > 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: `Validation error: ${errors.join(", ")}`,
            });
            return;
        }

        next();
    };
};