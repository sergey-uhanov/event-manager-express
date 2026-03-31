import pool from "../db/pool.js";


class FileRepository {
    async createMetaDataImage(file, id, key) {

        const result = await pool.query(
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

    async deleteFiles(idFile) {
        const result = await pool.query(`
                    DELETE
                    FROM files
                    WHERE event_id = $1
                    RETURNING files.key`,
            [idFile])

        return result.rows;
    }
}

export default new FileRepository();