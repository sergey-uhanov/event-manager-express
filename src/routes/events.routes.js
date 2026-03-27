import Router from "express";
import EventsController from "../controllers/events.controller.js";
import {validate} from "../middlewares/validate/validate.middleware.js";
import {createEventSchema, getEventsByIDQuerySchema, getEventsQuerySchema} from "../schemas/event.schema.js";
import {asyncHandler} from "../utils/async-handler.js";
import {upload} from "../middlewares/multer.middleware.js";
import {uploadFileService} from "../services/upload-file.service.js";

const eventsRouter = new Router()

eventsRouter.get('/', validate(getEventsQuerySchema), asyncHandler(EventsController.getAll))

eventsRouter.post(
    '/',
    upload.array('images', 5),
    validate(createEventSchema),
    asyncHandler(EventsController.create)
);

eventsRouter.get(
    '/:id',
    // validate(getEventsByIDQuerySchema),
    asyncHandler(EventsController.getById))

export default eventsRouter;