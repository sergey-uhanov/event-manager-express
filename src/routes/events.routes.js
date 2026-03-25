import Router from "express";
import EventsController from "../controllers/events.controller.js";
import {validate} from "../middlewares/validate/validate.middleware.js";
import {createEventSchema, getEventsQuerySchema} from "../schemas/event.schema.js";
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

eventsRouter.post('/create', upload.array('images', 5),
    async (req, res, next) => {

        // const {title, description, event_date} = req.body;
        const files = req.files;

        // 1. создаем event
        // const eventResult = await pool.query(
        //     `INSERT INTO events (title, description, event_date)
        //      VALUES ($1, $2, $3)
        //      RETURNING *`,
        //     [title, description, event_date]
        // );
        //
        // const event = eventResult.rows[0];

        // 2. загружаем файлы
        const uploadedFiles = [];

        for (const file of files) {
            console.log(file)
            const uploaded = await uploadFileService(file, 'events');

            // const fileResult = await pool.query(
            //     `INSERT INTO files (event_id, url, key, filename, mimetype, size)
            //      VALUES ($1, $2, $3, $4, $5, $6)
            //      RETURNING *`,
            //     [
            //         event.id,
            //         uploaded.url,
            //         uploaded.key,
            //         file.originalname,
            //         file.mimetype,
            //         file.size,
            //     ]
            // );

            uploadedFiles.push(uploaded);

        }
        res.json({
            // event,
            files: uploadedFiles,
        })
    }
)

export default eventsRouter;