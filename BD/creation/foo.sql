-- Active: 1694035110728@@localhost@3306@dev
SELECT c.id_compte, c.url_image_profil, c.nom_utilisateur, p.compte_id_proprio, p.id_projet, p.titre_projet, p.description_projet, id_demande_collab
            FROM demande_collab
            INNER JOIN compte c ON demande_collab.compte_id_compte = c.id_compte
            INNER JOIN projet p ON demande_collab.projet_id_projet = p.id_projet


SELECT c.id_compte, c.url_image_profil, c.nom_utilisateur, p.compte_id_proprio, p.id_projet, p.titre_projet, p.description_projet, id_demande_collab
            FROM demande_collab
            INNER JOIN compte c ON demande_collab.compte_id_compte = c.id_compte
            INNER JOIN projet p ON demande_collab.projet_id_projet = p.id_projet
            WHERE p.compte_id_proprio = 'yjoI2WF3w4WVr3kD9L01shSjjnL2'
            AND demande_collab.est_accepte IS NULL;

 UPDATE demande_collab 
            SET est_accepte = TRUE
            WHERE id_demande_collab = null;