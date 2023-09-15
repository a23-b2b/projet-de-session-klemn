-- Active: 1693586986008@@localhost@32769@dev
INSERT INTO autorisation (titre_autorisation) VALUES ('admin');     -- 1
INSERT INTO autorisation (titre_autorisation) VALUES ('client');    -- 2
INSERT INTO autorisation (titre_autorisation) VALUES ('inconnu');   -- 3
INSERT INTO autorisation (titre_autorisation) VALUES ('dieu');     -- 4

/*
INSERT INTO droit (chemin, autorisation_id_autorisation) VALUES ("/admin", 1);          -- 1 : Admin connecté
INSERT INTO droit (chemin, autorisation_id_autorisation) VALUES ("/index", 2);          -- 2 : Client connecté
INSERT INTO droit (chemin, autorisation_id_autorisation) VALUES ("/", 3);               -- 3 : Inconnu/Non-connecté
INSERT INTO droit (chemin, autorisation_id_autorisation) VALUES ("/inscription", 3);
INSERT INTO droit (chemin, autorisation_id_autorisation) VALUES ("/dieu", 4);           -- 4 : Super user
*/
INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, courriel, telephone, autorisation_id_autorisation)
VALUES
    ('id_1', '2023-08-30 10:00:00', 'Dubois', 'Jean', 'Admin_Jean', 'jean.dubois@example.com', '777-555-1234', 1),
    ('id_2', '2023-08-30 11:30:00', 'Tremblay', 'Marie', 'Client_Marie', 'marie.tremblay@example.com', '417-555-5678', 2),
    ('id_3', '2023-08-30 14:45:00', 'Lévesque', 'Pierre', 'Client_Pierre', 'pierre.levesque@example.com', '819-555-9012', 2);

INSERT INTO type_post (id_type_post, nom_type)
VALUES  (3, 'Collaboration'),
        (2, 'Question'),
        (1, 'Blogue');

COMMIT;