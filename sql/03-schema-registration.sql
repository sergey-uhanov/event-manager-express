DROP TABLE IF EXISTS registration;

CREATE TABLE public.registration
(
    event_id       INT NOT NULL,
    participant_id INT NOT NULL,

    PRIMARY KEY (event_id, participant_id),

    CONSTRAINT fk_event
        FOREIGN KEY (event_id)
            REFERENCES public.events (event_id)
            ON DELETE CASCADE,

    CONSTRAINT fk_participant
        FOREIGN KEY (participant_id)
            REFERENCES public.participants (participants_id)
            ON DELETE CASCADE
);

CREATE INDEX idx_registration_participant_id
    ON registration(participant_id);



INSERT INTO public.registration (event_id, participant_id)
VALUES  (7, 2),
        (5, 3),
        (9, 4),
        (11, 9),
        (8, 6),
        (2, 7),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (3, 7),
        (17, 2),
        (7, 3),
        (8, 4),
        (8, 5),
        (9, 6),
        (9, 7),
        (8, 2),
        (13, 3),
        (14, 4),
        (15, 5),
        (16, 6),
        (9, 8);
