-- Active: 1694035110728@@localhost@3306@dev
`INSERT INTO post (id_post, id_compte, id_type_post, titre, contenu, nombre_likes, nombre_dislikes,
                                       nombre_reposts, nombre_commentaires, nombre_partages, date_publication)
                     VALUES (SUBSTRING(MD5(UUID()) FROM 1 FOR 12), ?, 3, ?, ?, 0, 0, 0, 0, 0, NOW());
                     
                     INSERT INTO post_collab 
                        (id_collab, projet_id_projet, post_id_post)
                     VALUES (
                        SUBSTRING(MD5(UUID()) FROM 1 FOR 12),     
                        ?, 
                        (SELECT id_post FROM post WHERE id_compte=? order by date_publication desc limit 1)
                     );
                     
                    SELECT id_post
                    FROM post
                    WHERE id_compte = ?
                    order by date_publication desc
                    limit 1;`