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

