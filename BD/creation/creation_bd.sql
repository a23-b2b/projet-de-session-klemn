-- Active: 1693586986008@@localhost@32769@dev
DROP TABLE IF EXISTS compte;
-- DROP TABLE IF EXISTS autorisation;

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

CREATE TABLE autorisation (
    id_autorisation     int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre_autorisation  varchar(255)
);
