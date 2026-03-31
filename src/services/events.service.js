export class EventsService {
    constructor({
                    eventRepository,
                    fileRepository,
                    uploadFileService,
                    deleteFileService,
                    addTempLinksImg
                }) {
        this.eventRepository = eventRepository;
        this.fileRepository = fileRepository;
        this.uploadFileService = uploadFileService;
        this.deleteFileService = deleteFileService;
        this.addTempLinksImg = addTempLinksImg;
    }

    async getAll({ limit = 10, page = 1, sortBy = 'event_date', order = 'desc' } = {}) {
        const safeLimit = Math.min(Number(limit) || 10, 100);
        const safePage = Number(page) || 1;

        const allowedSortFields = ['title', 'event_date'];

        const safeSortBy = allowedSortFields.includes(sortBy)
            ? sortBy
            : 'event_date';

        const safeOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        const offset = safeLimit * (safePage - 1);

        const [countResult, dataResult] = await this.eventRepository.findAll({
            limit: safeLimit,
            sortBy: safeSortBy,
            order: safeOrder,
            offset
        });

        const dataWithImg = await this.addTempLinksImg(dataResult.rows);

        const total = Number(countResult.rows[0].count);
        const maxPage = Math.max(1, Math.ceil(total / safeLimit));

        if (safePage > maxPage) {
            throw new AppError('Page does not exist', 400, 'PAGE_OUT_OF_RANGE');
        }

        return {
            data: dataWithImg,
            total,
            limit: safeLimit,
            totalPages: maxPage,
            currentPage: safePage,
        };
    }

    async create({ body, files }) {
        const event = await this.eventRepository.create(body);

        const uploadedFiles = [];

        if (files?.length) {
            for (const file of files) {
                const uploadedKey = await this.uploadFileService(file, 'events');

                const metaData = await this.fileRepository.createMetaDataImage(
                    file,
                    event.event_id,
                    uploadedKey
                );

                uploadedFiles.push(metaData);
            }
        }

        event.images = uploadedFiles;
        return event;
    }

    async getById(id) {
        const idSafe = Number.parseInt(id);

        const event = await this.eventRepository.findById(idSafe);

        if (!event) {
            throw new AppError('Event not found', 400, 'NOT_FOUND');
        }

        return await this.addTempLinksImg([event]);
    }

    async update({ body, files }) {
        const event = await this.eventRepository.update(body);

        if (!event) {
            throw new AppError('Event not found', 400, 'NOT_FOUND');
        }

        const uploadedFiles = [];

        if (files?.length) {
            const oldFiles = await this.fileRepository.deleteFiles(event.event_id);

            for (const file of files) {
                const uploadedKey = await this.uploadFileService(file, 'events');

                const metaData = await this.fileRepository.createMetaDataImage(
                    file,
                    event.event_id,
                    uploadedKey
                );

                uploadedFiles.push(metaData);
            }

            event.files = uploadedFiles;

            for (const oldFile of oldFiles) {
                await this.deleteFileService(oldFile.key, 'events');
            }
        }

        await this.addTempLinksImg([event]);

        return event;
    }

    async delete(id) {
        return await this.eventRepository.delete(id);
    }
}