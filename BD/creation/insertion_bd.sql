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


INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation_id_autorisation)
VALUES
    ('yjoI2WF3w4WVr3kD9L01shSjjnL2', '2023-08-30 10:00:00', 'nom de louis', 'prenom de louis', 'usernameLouis', 'Louis Nom Affichage', 'louis@louis.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', 3);

INSERT INTO post 
    (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes, nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
VALUES 
    ('post_blogue_id_1', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 1, "Titre de Blogue", "Contenu de Blogue", 0, 0, 0, 0, 0, NOW()),
    ('post_question_id_2', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 2, "Titre de Question", "Contenu de Question", 0, 0, 0, 0, 0, NOW()),
    ('post_collab_id_3', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 3, "Titre de Collaboration", "Contenu de Collaboration", 0, 0, 0, 0, 0, NOW());

INSERT INTO post_question 
    (id_question, est_resolu, post_meilleure_reponse, post_id_post)
VALUES 
    (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), false, null, 'post_question_id_2');

INSERT INTO post_collab 
    (id_collab, est_ouvert, url_git, post_id_post)
VALUES 
    ('610ef2fce0a0', true, 'https://github.com/', 'post_collab_id_3');
COMMIT;


INSERT INTO post 
    (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes, nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
VALUES 
    ('post_collab_id', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 1, "Titre de Blogue", "Contenu de Blogue", 0, 0, 0, 0, 0, NOW());

INSERT INTO post_collab 
    (id_collab, est_ouvert, url_git, post_id_post)
VALUES 
    ('id_collab', true, 'https://github.com/', 'post_collab_id');

INSERT INTO demande_collab 
    (id_demande_collab, est_accepte, post_collab_id_collab, id_collaborateur)
VALUES
    ("id_demande", false, "id_collab", "yjoI2WF3w4WVr3kD9L01shSjjnL2");