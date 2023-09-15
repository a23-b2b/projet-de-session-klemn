-- Active: 1693586986008@@localhost@32769@dev
DROP TABLE IF EXISTS image_post;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS type_post;
DROP TABLE IF EXISTS compte;
DROP TABLE IF EXISTS autorisation;

CREATE TABLE autorisation (
    id_autorisation     int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre_autorisation  varchar(255)
);

CREATE TABLE compte(  
    id_compte                       varchar(255) NOT NULL PRIMARY KEY,
    date_creation_compte            DATETIME,
    nom                             varchar(255),
    prenom                          varchar(255),
    nom_utilisateur                 varchar(255) NOT NULL,
    courriel                        varchar(255), 
    telephone                       varchar(20),
    autorisation_id_autorisation    int NOT NULL,
    FOREIGN KEY (autorisation_id_autorisation) REFERENCES autorisation(id_autorisation),
    CONSTRAINT uc_compte_nom_utilisateur UNIQUE (nom_utilisateur),
    CONSTRAINT uc_compte_courriel UNIQUE (courriel)
);

CREATE TABLE type_post
(
    id_type_post INT          NOT NULL
        PRIMARY KEY,
    nom_type     VARCHAR(255) NOT NULL
);

CREATE TABLE post
(
    id_post          VARCHAR(255)  NOT NULL
        PRIMARY KEY,
    id_compte        VARCHAR(255)  NOT NULL,
    id_parent        VARCHAR(255)  NULL,
    id_type_post     INT           NULL,
    id_infos         VARCHAR(255)  NULL,
    titre            VARCHAR(255)  NULL,
    contenu          VARCHAR(4000) NOT NULL,
    nombre_likes     INT           NOT NULL,
    nombre_reposts   INT           NOT NULL,
    nombre_partages  INT           NOT NULL,
    date_publication DATETIME      NOT NULL,
    CONSTRAINT post_compte_id_compte_fk
        FOREIGN KEY (id_compte) REFERENCES compte (id_compte),
    CONSTRAINT post_post_id_post_fk
        FOREIGN KEY (id_parent) REFERENCES post (id_post),
    CONSTRAINT post_type_post_id_type_post_fk
        FOREIGN KEY (id_type_post) REFERENCES type_post (id_type_post)
);

CREATE TABLE image_post
(
    id_image  VARCHAR(255)  NOT NULL
        PRIMARY KEY,
    id_post   VARCHAR(255)  NOT NULL,
    url_image VARCHAR(4000) NOT NULL,
    CONSTRAINT image_post_post_id_post_fk
        FOREIGN KEY (id_post) REFERENCES post (id_post)
);
