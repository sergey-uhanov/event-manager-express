DROP TABLE IF EXISTS public.events CASCADE;

CREATE TABLE public.events
(
    event_id SERIAL,
    title character varying(256) NOT NULL,
    description text NOT NULL,
    location character varying(256) NOT NULL,
    event_date timestamptz NOT NULL,
    max_participants integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (event_id),
    CONSTRAINT events_max_participants_check CHECK (max_participants > 0)
);

ALTER TABLE IF EXISTS public.events
    OWNER to postgres;

CREATE INDEX events_location_idx
    ON events(location);

CREATE INDEX events_event_date_idx
    ON events(event_date);