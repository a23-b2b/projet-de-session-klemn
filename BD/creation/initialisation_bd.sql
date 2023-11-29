-- Active: 1693586986008@@localhost@32769@dev
DROP PROCEDURE IF EXISTS verifier_autorisation_post;
CREATE PROCEDURE verifier_autorisation_post(p_id_compte VARCHAR(255), p_id_post VARCHAR(255))
BEGIN
    DECLARE post_inexistant BOOLEAN DEFAULT FALSE;
    DECLARE id_compte_proprietaire VARCHAR(255) DEFAULT '';

    SELECT COUNT(id_post) = 0 INTO post_inexistant
    FROM post
    WHERE id_post = p_id_post;

    IF post_inexistant THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erreur: post inexistant';
    END IF;

    SELECT id_compte INTO id_compte_proprietaire
    FROM post
    WHERE id_post = p_id_post;

    IF p_id_compte != id_compte_proprietaire THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erreur: compte non autorisé';
    END IF;
END;

DROP PROCEDURE IF EXISTS verifier_autorisation_projet;
CREATE PROCEDURE verifier_autorisation_projet(p_id_compte VARCHAR(255), p_id_projet VARCHAR(255))
BEGIN
    DECLARE projet_inexistant BOOLEAN DEFAULT FALSE;
    DECLARE id_compte_proprietaire VARCHAR(255) DEFAULT '';

    SELECT COUNT(id_projet) = 0 INTO projet_inexistant
    FROM projet
    WHERE id_projet = p_id_projet;

    IF projet_inexistant THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erreur: projet inexistant';
    END IF;

    SELECT compte_id_proprio INTO id_compte_proprietaire
    FROM projet
    WHERE id_projet = p_id_projet;

    IF p_id_compte != id_compte_proprietaire THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erreur: compte non autorisé';
    END IF;
END;

CREATE OR REPLACE VIEW post_view AS
SELECT ROW_NUMBER() OVER (ORDER BY post.date_publication) AS numero_post,
       post.*,       
       pc.projet_id_projet,
       pc.id_collab,
       pq.est_resolu,
       pq.post_meilleure_reponse,
       pp.id_shared_post,
       pp.is_quoted_post,
       c.nom_affichage,
       c.nom_utilisateur,
       c.url_image_profil,
       b.badges
FROM post
         LEFT JOIN post_collab pc on post.id_post = pc.post_id_post
         LEFT JOIN post_question pq on post.id_post = pq.post_id_post
         LEFT JOIN post_partage pp on post.id_post = pp.id_post_original
         INNER JOIN compte c on post.id_compte = c.id_compte
         LEFT JOIN badge b on c.id_compte = b.id_compte
ORDER BY post.date_publication DESC;


COMMIT;
