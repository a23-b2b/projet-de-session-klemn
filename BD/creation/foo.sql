SELECT * FROM projet;
SELECT * FROM demande_collab;

SELECT 
                c.id_compte,
                c.url_image_profil,
                c.nom_utilisateur,
                p.compte_id_proprio,
                p.id_projet,
                p.titre_projet,
                p.description_projet,
                id_demande_collab
            FROM demande_collab
                left JOIN compte c ON demande_collab.id_collaborateur = c.id_compte
                LEFT JOIN projet p ON demande_collab.projet_id_projet = p.id_projet
                WHERE p.compte_id_proprio = 'yjoI2WF3w4WVr3kD9L01shSjjnL2' 
                AND demande_collab.est_accepte IS NULL;