import eventRepository from '../repositories/events.repository.js'
import fileRepository from '../repositories/file.repository.js'
import {AppError} from "../utils/app-error.js";
import {uploadFileService} from "./upload-file.service.js";
import {getFileUrl} from "../utils/get-file-url.js";

class EventsService {
    async getAll({limit = 10, page = 1, sortBy = 'event_date', order = 'desc'} = {}) {
        const safeLimit = Math.min(Number(limit) || 10, 100);
        const safePage = Number(page) || 1;

        const allowedSortFields = ['title', 'event_date'];

        const safeSortBy = allowedSortFields.includes(sortBy)
            ? sortBy
            : 'event_date';

        const safeOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        const offset = safeLimit * (safePage - 1);

        const [countResult, dataResult] = await eventRepository.findAll({
            limit: safeLimit,
            sortBy: safeSortBy,
            order: safeOrder,
            offset
        })

        // adding a temporary link to an image
        const addImgUrl = await Promise.all(
            dataResult.rows.map(async (item) => {
                if (item.files.length) {
                    item.files = await Promise.all(
                        item.files.map(async (file) => {
                            file.url = await getFileUrl(file.key, 'events');
                            return file;
                        })
                    );
                }

                return item;
            })
        );
        const total = Number(countResult.rows[0].count);
        const maxPage = Math.max(1, Math.ceil(total / safeLimit));

        if (safePage > maxPage) {
            console.log(safePage, maxPage)
            throw new AppError('Page does not exist', 400, 'PAGE_OUT_OF_RANGE');
        }

        return {
            data: addImgUrl,
            total,
            limit: safeLimit,
            totalPages: maxPage,
            currentPage: safePage,
        };
    }

    async create(req) {
        const event = await eventRepository.create(req.body)

        const uploadedFiles = [];

        for (const file of req.files) {
            const uploadedKey = await uploadFileService(file, 'events');
            const metaData = await fileRepository.createMetaDataImage(file, event.event_id, uploadedKey);

            uploadedFiles.push(metaData)
        }

        event.images = uploadedFiles;
        return event;
    }
}

export default new EventsService();