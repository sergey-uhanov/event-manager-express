export default class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }

    getAll = async (req, res) => {
        const events = await this.eventsService.getAll(req.query);
        res.send(events);
    };

    create = async (req, res) => {
        const event = await this.eventsService.create({
            body: req.body,
            files: req.files
        });

        res.status(201).send(event);
    };

    getById = async (req, res) => {
        const event = await this.eventsService.getById(req.params.id);
        res.send(event);
    };

    update = async (req, res) => {
        const event = await this.eventsService.update({
            body: req.body,
            files: req.files
        });

        res.send(event);
    };

    delete = async (req, res) => {
        const id = await this.eventsService.delete(req.params.id);
        res.send(`Event with id ${id} successfully deleted`);
    };
}