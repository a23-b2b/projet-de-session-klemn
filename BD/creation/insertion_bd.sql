
INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation_id_autorisation)
VALUES
    ('id_1', '2023-08-30 10:00:00', 'Dubois', 'Jean', 'Admin_Jean', 'Jean Dubois', 'jean.dubois@example.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', 1),
    ('id_2', '2023-08-30 11:30:00', 'Tremblay', 'Marie', 'Client_Marie', 'Marie Tremblay', 'marie.tremblay@example.com', '417-555-5678', 0, 0, 'Je viens d''arriver sur Klemn!', 3),
    ('id_3', '2023-08-30 14:45:00', 'Lévesque', 'Pierre', 'Modo_Pierre', 'Pierre Lévesque', 'pierre.levesque@example.com', '819-555-9012', 0, 0, 'Je viens d''arriver sur Klemn!', 2);

INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation_id_autorisation)
VALUES
    ('yjoI2WF3w4WVr3kD9L01shSjjnL2', '2023-08-30 10:00:00', 'nom de louis', 'prenom de louis', 'usernameLouis', 'Louis Nom Affichage', 'louis@louis.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', 'pre_made_set_2');

INSERT INTO type_post (id_type_post, nom_type)
VALUES  (6, 'Boost'),
        (5, 'Quote'),
        (4, 'Réponse'),
        (3, 'Collaboration'),
        (2, 'Question'),
        (1, 'Blogue');

COMMIT;
