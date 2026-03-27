import pool from "../db/pool.js";


class EventRepository {
    async findAll({limit, sortBy, order, offset}) {
       const  [countResult, dataResult] = await Promise.all([
            pool.query(`SELECT COUNT(*)
                        FROM events`),
            pool.query(
                `SELECT e.event_id,
                        e.title,
                        e.description,
                        e.location,
                        e.event_date,
                        e.max_participants,
                        e.created_at,
                        COALESCE(
                                json_agg(
                                        json_build_object(
                                                'file_id', f.file_id,
                                                'key', f.key,
                                                'filename', f.filename,
                                                'mimetype', f.mimetype,
                                                'size', f.size
                                        )
                                ) FILTER(WHERE f.file_id IS NOT NULL),
                                '[]'
                        ) AS files

                 FROM events e
                          LEFT JOIN files f ON e.event_id = f.event_id

                 GROUP BY e.event_id

                 ORDER BY e.${sortBy} ${order}
                LIMIT $1
                 OFFSET $2`,
                [limit, offset]
            )
        ]);

       return [countResult, dataResult]
    }

    async findById(id) {
        const result = await pool.query(
            `SELECT e.event_id,
                    e.title,
                    e.description,
                    e.location,
                    e.event_date,
                    e.max_participants,
                    e.created_at,
                    COALESCE(
                            json_agg(
                                    json_build_object(
                                            'file_id', f.file_id,
                                            'key', f.key,
                                            'filename', f.filename,
                                            'mimetype', f.mimetype,
                                            'size', f.size
                                    )
                            ) FILTER(WHERE f.file_id IS NOT NULL),
                            '[]'
                    ) AS files
             FROM events e
                      LEFT JOIN files f ON e.event_id = f.event_id

             WHERE e.event_id = $1
             GROUP BY e.event_id
            `,
            [id]
        );

        return result.rows[0] || null;
    }

    async create({title, description, location, event_date, max_participants}) {
        const result = await pool.query(
            `INSERT INTO events
                 (title, description, location, event_date, max_participants)
             VALUES ($1, $2, $3, $4,
                     $5) RETURNING event_id, title, description, location, event_date, max_participants, created_at`,
            [title, description, location, event_date, max_participants]
        );

        return result.rows[0];
    }

    async update(event_id, data) {
        const {title, description, location, event_date, max_participants} = data;

        const result = await pool.query(
            `UPDATE events
             SET title            = $1,
                 description      = $2,
                 location         = $3,
                 event_date       = $4,
                 max_participants = $5
             WHERE event_id = $6 RETURNING event_id, title, description, location, event_date, max_participants, created_at`,
            [title, description, location, event_date, max_participants, event_id]
        );

        return result.rows[0] || null;
    }

    async delete(event_id) {
        const result = await pool.query(
            `DELETE
             FROM events
             WHERE event_id = $1 RETURNING event_id`,
            [event_id]
        );

        return result.rows[0] || null;
    }

    as
}

export default new EventRepository()