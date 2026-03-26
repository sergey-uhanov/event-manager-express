DROP TABLE IF EXISTS files;

CREATE TABLE files (
                       file_id SERIAL PRIMARY KEY,
                       event_id INTEGER REFERENCES events(event_id) ON DELETE CASCADE,
                       key TEXT NOT NULL,
                       filename TEXT,
                       mimetype TEXT,
                       size INTEGER,
                       created_at TIMESTAMP DEFAULT now()
);