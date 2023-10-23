-- Active: 1694035110728@@localhost@3306@dev
SELECT c.id_compte, c.url_image_profil, c.nom_utilisateur, p.compte_id_proprio, p.id_projet, p.titre_projet, p.description_projet, id_demande_collab
    FROM demande_collab
    INNER JOIN compte c ON demande_collab.compte_id_compte = c.id_compte
    INNER JOIN projet p ON demande_collab.projet_id_projet = p.id_projet
    WHERE p.compte_id_proprio = ?
    AND d.est_accepte IS null;