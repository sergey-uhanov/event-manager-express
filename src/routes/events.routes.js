import Router from "express";
import EventsController from "../controllers/events.controller.js";
import {validate} from "../middlewares/validate/validate.middleware.js";
import {
    createEventSchema,
    deleteEventSchema,
    getEventsByIDQuerySchema,
    getEventsQuerySchema,
    updateEventSchema
} from "../schemas/event.schema.js";
import {asyncHandler} from "../utils/async-handler.js";
import {upload} from "../middlewares/multer.middleware.js";
import {eventsService} from "../container/events.container.js";

const eventsRouter = new Router()
const controller = new EventsController(eventsService);

eventsRouter.get('/',
    validate(getEventsQuerySchema),
    asyncHandler(controller.getAll))

eventsRouter.post(
    '/',
    upload.array('images', 5),
    validate(createEventSchema),
    asyncHandler(controller.create)
)

eventsRouter.get(
    '/:id',
    validate(getEventsByIDQuerySchema),
    asyncHandler(controller.getById))

eventsRouter.put(
    '/',
    upload.array('images', 5),
    validate(updateEventSchema),
    asyncHandler(controller.update)
)

eventsRouter.delete('/:id',
    validate(deleteEventSchema),
    asyncHandler(controller.delete)
)


export default eventsRouter;