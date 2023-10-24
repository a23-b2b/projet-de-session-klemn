-- Active: 1694035110728@@localhost@3306@dev
INSERT INTO compte 
    (id_compte, date_creation_compte, nom, prenom, nom_utilisateur, nom_affichage, courriel, telephone, nombre_abonnes, nombre_abonnements, biographie, autorisation)
VALUES
    ('yjoI2WF3w4WVr3kD9L01shSjjnL2', NOW(), 'nom de louis', 'prenom de louis', 'usernameLouis', 'Louis Nom Affichage', 'louis@louis.com', '777-555-1234', 0, 0, 'Je viens d''arriver sur Klemn!', 2),
    ('vOArxLHmRBO5ixknQ1LUbwcopCp2', NOW(), 'nom de marie', 'prenom de marie', 'usernamemarie', 'marie Nom Affichage', 'marie@marie.com', '222-555-1234', 0, 0, 'Je suis Marie!', 2);
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
  (id_projet, titre_projet, description_projet, url_repo_git, compte_id_proprio, est_ouvert)
VALUES
  ('id_projet_1', 'Titre de projet collaboratif L1', 'Marie veut collaborer avec Louis sur le projet ID: id_projet_1', '', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', true),
  ('id_projet_2', 'Titre de projet collaboratif M1', 'Louis veut collaborer avec Marie sur le projet ID: id_projet_2', '', 'vOArxLHmRBO5ixknQ1LUbwcopCp2', true),
  ('id_projet_3', 'Titre de projet collaboratif L2', 'Le deuxielme projet de ouis', '', 'yjoI2WF3w4WVr3kD9L01shSjjnL2', true);



INSERT INTO post_collab 
  (id_collab, projet_id_projet, post_id_post)
VALUES 
  ('id_collab_1', 'id_projet_1', 'post_collab_id_3');

INSERT INTO demande_collab 
  (id_demande_collab, est_accepte, projet_id_projet, compte_id_compte) 
VALUES 
  ('id_demande_collab_1', null, 'id_projet_1', 'vOArxLHmRBO5ixknQ1LUbwcopCp2'),
  ('id_demande_collab_2', null, 'id_projet_3', 'vOArxLHmRBO5ixknQ1LUbwcopCp2');


COMMIT;
