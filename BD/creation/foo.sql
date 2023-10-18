-- Active: 1693586986008@@localhost@32769@dev
 SELECT compte.id_compte, compte.url_image_profil, compte.nom_utilisateur, p.id_projet, p.titre_projet, p.description_projet, d.id_demande_collab
        FROM compte 
        INNER JOIN projet p ON compte.id_compte = p.compte_id_proprio
        INNER JOIN demande_collab d ON p.id_projet = d.projet_id_projet
        WHERE p.compte_id_proprio =  'yjoI2WF3w4WVr3kD9L01shSjjnL2'
        AND d.est_accepte IS null;