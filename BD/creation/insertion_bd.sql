-- Active: 1694035110728@@localhost@3306@dev
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
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation_id_autorisation)
VALUES
    ('id_1', '2023-08-30 10:00:00', 'Dubois', 'Jean', 'Admin_Jean', 'Jean Dubois', 'jean.dubois@example.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', 1),
    ('id_2', '2023-08-30 11:30:00', 'Tremblay', 'Marie', 'Client_Marie', 'Marie Tremblay', 'marie.tremblay@example.com', '417-555-5678', 0, 0, 'Je viens d''arriver sur Klemn!', 2),
    ('id_3', '2023-08-30 14:45:00', 'Lévesque', 'Pierre', 'Client_Pierre', 'Pierre Lévesque', 'pierre.levesque@example.com', '819-555-9012', 0, 0, 'Je viens d''arriver sur Klemn!', 2);

INSERT INTO type_post (id_type_post, nom_type)
VALUES  (4, 'Réponse'),
        (3, 'Collaboration'),
        (2, 'Question'),
        (1, 'Blogue');

COMMIT;
