-- Active: 1694035110728@@localhost@3306@dev

DROP TABLE IF EXISTS demande_collab;

DROP TABLE IF EXISTS post_collab;

DROP TABLE IF EXISTS post_question;

DROP TABLE IF EXISTS image_post;

DROP TABLE IF EXISTS post;

DROP TABLE IF EXISTS type_post;

DROP TABLE IF EXISTS compte;

DROP TABLE IF EXISTS autorisation;

DROP TABLE IF EXISTS post_collab;

DROP TABLE IF EXISTS post_question;

CREATE TABLE
    autorisation (
        id_autorisation int PRIMARY KEY AUTO_INCREMENT,
        titre_autorisation varchar(255)
    );

CREATE TABLE
    compte(
        id_compte varchar(255) PRIMARY KEY,
        date_creation_compte DATETIME NOT NULL,
        nom varchar(255) NOT NULL,
        prenom varchar(255) NOT NULL,
        nom_utilisateur varchar(255) NOT NULL,
        nom_affichage varchar(255),
        courriel varchar(255) NOT NULL,
        telephone varchar(20),
        nombre_abonnes int,
        nombre_abonnements int,
        biographie VARCHAR(1000),
        url_image_profil VARCHAR(1000),
        url_image_banniere VARCHAR(1000),
        autorisation_id_autorisation int NOT NULL,
        FOREIGN KEY (autorisation_id_autorisation) REFERENCES autorisation(id_autorisation),
        CONSTRAINT uc_compte_nom_utilisateur UNIQUE (nom_utilisateur),
        CONSTRAINT uc_compte_courriel UNIQUE (courriel)
    );

CREATE TABLE
    type_post (
        id_type_post INT PRIMARY KEY,
        nom_type VARCHAR(255) NOT NULL
    );

CREATE TABLE
    post (
        id_post VARCHAR(255) PRIMARY KEY,
        id_compte VARCHAR(255) NOT NULL,
        id_parent VARCHAR(255) NULL,
        id_type_post INT NULL,
        id_infos VARCHAR(255) NULL,
        titre VARCHAR(255) NULL,
        contenu VARCHAR(4000) NOT NULL,
        nombre_likes INT NOT NULL,
        nombre_dislikes INT NOT NULL,
        nombre_reposts INT NOT NULL,
        nombre_commentaires INT NOT NULL,
        nombre_partages INT NOT NULL,
        date_publication DATETIME NOT NULL,
        CONSTRAINT post_compte_id_compte_fk FOREIGN KEY (id_compte) REFERENCES compte (id_compte),
        CONSTRAINT post_post_id_post_fk FOREIGN KEY (id_parent) REFERENCES post (id_post),
        CONSTRAINT post_type_post_id_type_post_fk FOREIGN KEY (id_type_post) REFERENCES type_post (id_type_post)
    );

CREATE TABLE
    image_post (
        id_image VARCHAR(255) PRIMARY KEY,
        post_id_post VARCHAR(255) NOT NULL,
        url_image VARCHAR(4000) NOT NULL,
        CONSTRAINT image_post_post_id_post_fk FOREIGN KEY (post_id_post) REFERENCES post (id_post)
    );

CREATE TABLE
    post_collab (
        id_collab VARCHAR(255) PRIMARY KEY,
        est_ouvert BOOLEAN NOT NULL DEFAULT TRUE,
        url_git VARCHAR (255),
        post_id_post VARCHAR(255),
        CONSTRAINT post_collab_post_id_post_fk FOREIGN KEY (post_id_post) REFERENCES post (id_post)
    );

CREATE TABLE
    demande_collab (
        id_demande_collab VARCHAR(255) PRIMARY KEY,
        statut BOOLEAN NOT NULL DEFAULT FALSE,
        post_collab_id_collab VARCHAR(255),
        id_collaborateur VARCHAR (255),

CONSTRAINT demande_collab_post_collab_id_collab_fk FOREIGN KEY (post_collab_id_collab) REFERENCES post_collab (id_collab),
CONSTRAINT demande_collab_compte_id_collaborateur_fk FOREIGN KEY (id_collaborateur) REFERENCES compte (id_compte)
);


CREATE TABLE 
    post_question (
        id_question VARCHAR(255) PRIMARY KEY,
        est_resolu BOOLEAN NOT NULL DEFAULT FALSE,
        
        post_id_post VARCHAR(255),
        post_meilleure_reponse VARCHAR(255) NULL,

CONSTRAINT post_question_post_id_post_fk FOREIGN KEY (post_id_post) REFERENCES post (id_post),
CONSTRAINT post_question_post_meilleure_reponse_fk FOREIGN KEY (post_meilleure_reponse) REFERENCES post (id_post)
);