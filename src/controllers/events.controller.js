import eventsService from "../services/events.service.js";

class EventsController {
    async getAll(req, res) {
        const events = await eventsService.getAll(req.query)
        res.status(200).send(events)

    }

    async create(req, res) {

         const event = await eventsService.create(req)

        res.status(201).send(event)

    }


}

export default new EventsController()