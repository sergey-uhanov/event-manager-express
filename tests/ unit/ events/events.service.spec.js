
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import {createEventsService} from "./events.service.factory.js";
import {eventMock} from "./fixtures/event.fixture.js";


describe('EventsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create event without files', async () => {
            const { service, deps } = createEventsService();

            deps.eventRepository.create.mockResolvedValue(eventMock);

            const result = await service.create({
                body: { title: 'Test' },
                files: []
            });

            expect(deps.eventRepository.create).toHaveBeenCalledWith({
                title: 'Test'
            });

            expect(result.images).toEqual([]);
        });
    });
});

describe('getAll', () => {
    it('should return paginated result', async () => {
        const { service, deps } = createEventsService();

        deps.eventRepository.findAll.mockResolvedValue([
            { rows: [{ count: 2 }] },
            { rows: [{ id: 1 }, { id: 2 }] }
        ]);

        deps.addTempLinksImg.mockResolvedValue([{ id: 1 }, { id: 2 }]);

        const result = await service.getAll({ page: 1, limit: 10 });

        expect(result.total).toBe(1);
        expect(result.data).toHaveLength(1);
    });

    it('should throw if page out of range', async () => {
        const { service, deps } = createEventsService();

        deps.eventRepository.findAll.mockResolvedValue([
            { rows: [{ count: 1 }] },
            { rows: [] }
        ]);

        await expect(
            service.getAll({ page: 999 })
        ).rejects.toThrow('Page does not exist');
    });
});