import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constant/httpConstant";
import * as eventService from "../services/eventServices";

// Get all events
export const getEvents = (req: Request, res: Response): void => {
    const events = eventService.getAllEvents();

    res.status(HTTP_STATUS.OK).json({
        message: "Events is collected",
        count: events.length,
        data: events,
    });
};

// Get an event by :id
export const getEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const event = eventService.getEventById(id);

    if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Event is collected",
        data: event,
    });
};

// Get popularity by :id
export const getEventPopularity = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const event = eventService.getEventById(id);

    if (!event) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
        return;
    }

    const eventPop = eventService.popularityScore(
        event.capacity,
        event.registrationCount
    );


    const spotsRemaining = event.capacity - event.registrationCount;

    res.status(HTTP_STATUS.OK).json({
        message: "Event popularity calculated",
        data: {
            id: event.id,
            name: event.name,
            date: event.date,
            capacity: event.capacity,
            registrationCount: event.registrationCount,
            spotsRemaining: spotsRemaining,
            popularityScore: eventPop.score,
            popularityTier: eventPop.tier,
        },
    });
};

// Post 
// creating an event that requires name, date and capacity
export const createEvent = (req: Request, res: Response): void => {
    const { name, date, capacity } = req.body;

    if (!name || !date || capacity === undefined) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required fields: name, date, capacity",
        });
        return;
    }

    const newEvent = eventService.createEvent(
        String(name),
        String(date),
        Number(capacity)
    );

    res.status(HTTP_STATUS.CREATED).json({
        message: "Event created",
        data: newEvent,
    });
};

// Put by :id
export const updateEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);

    if (!req.params.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing id" });
        return;
    }

    const updated = eventService.updateEvent(id, req.body);

    if (!updated) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Event updated",
        data: updated,
    });
};

// Delete by :id
export const deleteEvent = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const deleted = eventService.deleteEvent(id);

    if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Event deleted",
        data: deleted,
    });
};
