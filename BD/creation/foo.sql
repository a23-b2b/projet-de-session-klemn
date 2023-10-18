-- Active: 1693586986008@@localhost@32769@devINSERT INTO collaborateur (INSERT INTO collaborateur (
INSERT INTO collaborateur (
            id_collaborateur,
            compte_id_compte,
            projet_id_projet)
        VALUES (
            SUBSTRING(MD5(UUID()) FROM 1 FOR 12),
            'yjoI2WF3w4WVr3kD9L01shSjjnL2',
            'id_projet_1');  