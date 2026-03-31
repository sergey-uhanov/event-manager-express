

import { EventsService } from '../../../src/services/events.service.js';
import {jest} from "@jest/globals";

export function createEventsService(overrides = {}) {
    const defaultDeps = {
        eventRepository: {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        },
        fileRepository: {
            createMetaDataImage: jest.fn(),
            deleteFiles: jest.fn()
        },
        uploadFileService: jest.fn(),
        deleteFileService: jest.fn(),
        addTempLinksImg: jest.fn()
    };

    const deps = { ...defaultDeps, ...overrides };

    return {
        service: new EventsService(deps),
        deps
    };
}