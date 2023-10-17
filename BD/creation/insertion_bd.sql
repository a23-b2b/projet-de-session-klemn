-- Active: 1697551367961@@127.0.0.1@3306@dev
INSERT INTO autorisation (
  id_autorisation, titre_autorisation
) 
VALUES 
  ('pre_made_set_2', 'admin');
INSERT INTO compte (
  id_compte, date_creation_compte, 
  nom, prenom, nom_utilisateur, nom_affichage, 
  courriel, telephone, nombre_abonnes, 
  nombre_abonnements, biographie, 
  autorisation_id_autorisation
) 
VALUES 
  (
    'id_1', NOW(), 'Dubois', 
    'Jean', 'Admin_Jean', 'Jean Dubois', 
    'jean.dubois@example.com', '777-555-1234', 
    0, 0, 'Je viens d''arriver sur Klemn!', 
    'pre_made_set_2'
  ), 
  (
    'id_2', NOW(), 'Tremblay', 
    'Marie', 'Client_Marie', 'Marie Tremblay', 
    'marie.tremblay@example.com', '417-555-5678', 
    0, 0, 'Je viens d''arriver sur Klemn!', 
    'pre_made_set_2'
  ), 
  (
    'id_3', NOW(), 'Lévesque', 
    'Pierre', 'Client_Pierre', 'Pierre Lévesque', 
    'pierre.levesque@example.com', 
    '819-555-9012', 0, 0, 'Je viens d''arriver sur Klemn!', 
    'pre_made_set_2'
  );
INSERT INTO type_post (id_type_post, nom_type) 
VALUES 
  (4, 'Réponse'), 
  (3, 'Collaboration'), 
  (2, 'Question'), 
  (1, 'Blogue');


INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation_id_autorisation)
VALUES
    ('yjoI2WF3w4WVr3kD9L01shSjjnL2', NOW(), 'nom de louis', 'prenom de louis', 'usernameLouis', 'Louis Nom Affichage', 'louis@louis.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', "pre_made_set_2"),
    ('vOArxLHmRBO5ixknQ1LUbwcopCp2', NOW(), 'nom de marie', 'prenom de marie', 'usernamemarie', 'marie Nom Affichage', 'marie@marie.com', '222-555-1234', 0, 0, 'Je suis Marie!', "pre_made_set_2");
INSERT INTO post (
  id_post, id_compte, id_type_post, 
  titre, contenu, nombre_likes, nombre_dislikes, 
  nombre_reposts, nombre_commentaires, 
  nombre_partages, date_publication
) 
VALUES 
  (
    'post_blogue_id_1', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 
    1, "Titre de Blogue", "Contenu de Blogue", 
    0, 0, 0, 0, 0, NOW()
  ), 
  (
    'post_question_id_2', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 
    2, "Titre de Question", "Contenu de Question", 
    0, 0, 0, 0, 0, NOW()
  ), 
  (
    'post_collab_id_3', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', 
    3, "Titre de Collaboration", "Contenu de Collaboration", 
    0, 0, 0, 0, 0, NOW()
  );
INSERT INTO post_question 
  (id_question, est_resolu, post_meilleure_reponse, post_id_post) 
VALUES 
  ('id_question_1', false, null, 'post_question_id_2');

-- Insertion pour test du système de collab. Marie veut collaborer avec Louis sur le projet ID: id_projet_1
INSERT INTO projet 
  (id_projet, titre_projet, description_projet, url_repo_git, compte_id_proprio)
VALUES
  ('id_projet_1', 'Titre de projet collaboratif', 'Marie veut collaborer avec Louis sur le projet ID: id_projet_1', 'https://github.com/a23-b2b/projet-de-session-klemn', 'yjoI2WF3w4WVr3kD9L01shSjjnL2');

INSERT INTO post_collab 
  (id_collab, projet_id_projet, post_id_post)
VALUES 
  ('id_collab_1', 'id_projet_1', 'post_collab_id_3');

INSERT INTO demande_collab 
  (id_demande_collab, est_accepte, post_collab_id_collab, compte_id_compte) 
VALUES 
  ('id_demande_collab_1', false, 'id_collab_1', 'vOArxLHmRBO5ixknQ1LUbwcopCp2');

COMMIT;
