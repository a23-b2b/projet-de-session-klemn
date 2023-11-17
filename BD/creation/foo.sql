-- Active: 1699032824852@@127.0.0.1@3306@dev
INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                       nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                     VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 3, ?, ?, 0, 0, 0, 0, 0, NOW());
                     
                     INSERT INTO post_collab 
                        (id_collab, projet_id_projet, post_id_post)
                     VALUES (
                        SUBSTRING(MD5(UUID()) FROM 1 FOR 12),     
                        ?, 
                        (SELECT id_post FROM post WHERE id_compte=? order by date_publication desc limit 1)
                     );
                     
                    SELECT *
                    FROM post
                    WHERE id_compte = "yjoI2WF3w4WVr3kD9L01shSjjnL2"
                    order by date_publication desc
                    limit 1;

                     SELECT post_view.*,
            vote.score as vote
        FROM post_view
            LEFT JOIN vote ON post_view.id_post = vote.id_post AND vote.id_compte = 'yjoI2WF3w4WVr3kD9L01shSjjnL2'
        WHERE post_view.id_post = 'abc3bdafea29';

SELECT * FROM compte;

DELETE FROM compte WHERE id_compte = "Hhl84MMRP6XKyR5LQh33UGOukfv1"