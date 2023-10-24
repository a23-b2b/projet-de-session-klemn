-- Active: 1694035110728@@localhost@3306@dev
 UPDATE demande_collab SET est_accepte = true WHERE courriel = (SELECT id_compte FROM compte WHERE courriel = 'marie@marie.com')