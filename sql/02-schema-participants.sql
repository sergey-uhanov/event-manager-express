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

INSERT INTO public.participants (name, email, status)
VALUES ('Иван Петров', 'ivan.petrov@email.com', 'registered'),
       ('Мария Смирнова', 'maria.smirnova@email.com', 'registered'),
       ('Алексей Козлов', 'alexey.kozlov@email.com', 'active'),
       ('Елена Новикова', 'elena.novikova@email.com', 'registered'),
       ('Дмитрий Волков', 'dmitry.volkov@email.com', 'inactive'),
       ('Анна Морозова', 'anna.morozova@email.com', 'registered'),
       ('Сергей Павлов', 'sergey.pavlov@email.com', 'active'),
       ('Ольга Соколова', 'olga.sokolova@email.com', 'registered'),
       ('Павел Лебедев', 'pavel.lebedev@email.com', 'registered'),
       ('Татьяна Ковалева', 'tatiana.kovaleva@email.com', 'inactive');