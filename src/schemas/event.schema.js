import {z} from 'zod'

export const createEventSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
        event_date: z.coerce.date(),
        max_participants: z.coerce.number(),
    }),
});

export const getEventsQuerySchema = z.object({
    query: z.object({
        limit: z.string().optional(),
        page: z.string().optional(),
        sortBy: z.enum(['title', 'event_date']).optional(),
        order: z.enum(['asc', 'desc']).optional(),
    })

});

export const getEventsByIDQuerySchema = z.object({
    param: z.object({
       id: z.string().optional(),
    })

});

export const updateEventSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        event_date: z.coerce.date().optional(),
        max_participants: z.coerce.number().optional(),
    }),
});