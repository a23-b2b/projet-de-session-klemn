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
    date_creation_compte            DATETIME NOT NULL,
    nom                             varchar(255) NOT NULL,
    prenom                          varchar(255) NOT NULL,
    nom_utilisateur                 varchar(255) NOT NULL,
    nom_affichage                   varchar(255),
    courriel                        varchar(255) NOT NULL,
    telephone                       varchar(20),
    nombre_abonnes                  int,
    nombre_abonnements              int,
    biographie                      VARCHAR(1000),
    url_image_profil                VARCHAR(1000),
    url_image_banniere              VARCHAR(1000),
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
    id_post             VARCHAR(255)  NOT NULL
        PRIMARY KEY,
    id_compte           VARCHAR(255)  NOT NULL,
    id_parent           VARCHAR(255)  NULL,
    id_type_post        INT           NULL,
    id_infos            VARCHAR(255)  NULL,
    titre               VARCHAR(255)  NULL,
    contenu             VARCHAR(4000) NOT NULL,
    nombre_likes        INT           NOT NULL,
    nombre_dislikes     INT           NOT NULL,
    nombre_reposts      INT           NOT NULL,
    nombre_commentaires INT           NOT NULL,
    nombre_partages     INT           NOT NULL,
    date_publication    DATETIME      NOT NULL,
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

create table compte_suivi
(
    compte      varchar(255) not null comment 'id du compte qui suit lautre compte (colonne suit)',
    suit        varchar(255) not null comment 'compte qui est suivi par compte',
    suit_depuis datetime     not null comment 'date depuis id_compte suit le compte',
    constraint compte_suivi_compte_id_compte_fk
        foreign key (compte) references compte (id_compte),
    constraint compte_suivi_compte_id_compte_fk2
        foreign key (suit) references compte (id_compte)
)
    comment 'Table qui contient les comptes suivis (follow) des utilisateurs';

create table vote
(
    id_compte varchar(255) not null,
    id_post   varchar(255) not null,
    score     int          not null,
    constraint vote_compte_id_compte_fk
        foreign key (id_compte) references compte (id_compte),
    constraint vote_post_id_post_fk
        foreign key (id_post) references post (id_post)
)
    comment 'Contient les votes (like, dislike) associés aux posts.';

create table dev.post_partage
(
    id_post_original varchar(255) not null,
    id_shared_post   varchar(255) null,
    is_quoted_post   tinyint(1)   null,
    constraint post_partage_post_id_post_fk
        foreign key (id_post_original) references dev.post (id_post),
    constraint post_partage_post_id_post_fk2
        foreign key (id_shared_post) references dev.post (id_post)
);