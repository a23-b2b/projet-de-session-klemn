-- Active: 1694035110728@@localhost@3306@dev
DROP 
  TABLE IF EXISTS compte_suivi CASCADE;
DROP 
  TABLE IF EXISTS vote;
DROP 
  TABLE IF EXISTS image_post;
DROP 
  TABLE IF EXISTS demande_collab;
DROP 
  TABLE IF EXISTS post_collab;
DROP 
  TABLE IF EXISTS post_question;

DROP
  TABLE IF EXISTS post_partage;

DROP 
  TABLE IF EXISTS post CASCADE;

DROP 
  TABLE IF EXISTS collaborateur;
DROP 
  TABLE IF EXISTS projet;

DROP 
  TABLE IF EXISTS compte;

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
    autorisation    int NOT NULL,
    CONSTRAINT uc_compte_nom_utilisateur UNIQUE (nom_utilisateur),
    CONSTRAINT uc_compte_courriel UNIQUE (courriel)
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
    est_markdown        BOOLEAN       NOT NULL DEFAULT FALSE,  
    nombre_likes        INT           NOT NULL,
    nombre_dislikes     INT           NOT NULL,
    nombre_reposts      INT           NOT NULL,
    nombre_commentaires INT           NOT NULL,
    nombre_partages     INT           NOT NULL,
    date_publication    DATETIME      NOT NULL,
    CONSTRAINT post_compte_id_compte_fk
        FOREIGN KEY (id_compte) REFERENCES compte (id_compte),
    CONSTRAINT post_post_id_post_fk
        FOREIGN KEY (id_parent) REFERENCES post (id_post)
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

create table post_partage
(
    id_post_original varchar(255) not null,
    id_shared_post   varchar(255) not null,
    is_quoted_post   tinyint(1)   null,
    constraint post_partage_post_id_post_fk
        foreign key (id_post_original) references post (id_post),
    constraint post_partage_post_id_post_fk2
        foreign key (id_shared_post) references post (id_post)
  );
    
CREATE TABLE post_collab (
  id_collab VARCHAR(255) PRIMARY KEY, 
  est_ouvert BOOLEAN NOT NULL DEFAULT TRUE, 
  url_git VARCHAR (255), 
  post_id_post VARCHAR(255), 
  CONSTRAINT post_collab_post_id_post_fk FOREIGN KEY (post_id_post) REFERENCES post (id_post)
  );

  CREATE TABLE demande_collab (
  id_demande_collab VARCHAR(255) PRIMARY KEY, 
  est_accepte BOOLEAN NOT NULL DEFAULT FALSE, 
  post_collab_id_collab VARCHAR(255), 
  id_collaborateur VARCHAR (255), 
  CONSTRAINT demande_collab_post_collab_id_collab_fk FOREIGN KEY (post_collab_id_collab) REFERENCES post_collab (id_collab), 
  CONSTRAINT demande_collab_compte_id_collaborateur_fk FOREIGN KEY (id_collaborateur) REFERENCES compte (id_compte)
);

CREATE TABLE post_question (
  id_question VARCHAR(255) PRIMARY KEY, 
  est_resolu BOOLEAN NOT NULL DEFAULT FALSE, 
  post_id_post VARCHAR(255), 
  post_meilleure_reponse VARCHAR(255) NULL, 
  CONSTRAINT post_question_post_id_post_fk FOREIGN KEY (post_id_post) REFERENCES post (id_post), 
  CONSTRAINT post_question_post_meilleure_reponse_fk FOREIGN KEY (post_meilleure_reponse) REFERENCES post (id_post)
);

CREATE OR REPLACE VIEW post_view AS
SELECT post.*,
       pc.url_git,
       pc.est_ouvert,
       pc.id_collab,
       pq.est_resolu,
       pq.post_meilleure_reponse,
       pp.id_shared_post,
       pp.is_quoted_post,
       c.nom_affichage,
       c.nom_utilisateur,
       c.url_image_profil
FROM post
         LEFT JOIN post_collab pc on post.id_post = pc.post_id_post
         LEFT JOIN post_question pq on post.id_post = pq.post_id_post
         LEFT JOIN post_partage pp on post.id_post = pp.id_post_original
         INNER JOIN compte c on post.id_compte = c.id_compte;

COMMIT;