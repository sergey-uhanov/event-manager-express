
import { EventsService } from '../services/events.service.js';
import eventRepository from '../repositories/events.repository.js';
import fileRepository from '../repositories/file.repository.js';
import { uploadFileService, deleteFileService } from '../services/upload-file.service.js';
import { addTempLinksImg } from '../utils/addTempLinksImg.js';

export const eventsService = new EventsService({
    eventRepository,
    fileRepository,
    uploadFileService,
    deleteFileService,
    addTempLinksImg
});