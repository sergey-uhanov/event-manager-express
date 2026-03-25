DROP TABLE IF EXISTS public.participants;

CREATE TABLE public.participants
    (
        participants_id SERIAL PRIMARY KEY,
        name varchar(256) NOT NULL,
        email varchar(256) NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        status varchar(50) DEFAULT 'registered',
        CONSTRAINT  email_uniq UNIQUE (email)
);

ALTER TABLE IF EXISTS public.participants
    OWNER to postgres;


CREATE INDEX name_idx ON participants USING HASH (name);
CREATE INDEX email_idx ON participants USING HASH (email);