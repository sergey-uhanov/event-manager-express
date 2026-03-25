import pool from "../db/pool.js";


class FileRepository {
    async createMetaDataImage(file, id, key) {

        const result =  await pool.query(
            `INSERT INTO files (event_id, key, filename, mimetype, size)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                id,
                key,
                file.originalname,
                file.mimetype,
                file.size,
            ]
        );
        return result.rows[0];
    }
}

export default new FileRepository();