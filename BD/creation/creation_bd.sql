-- Active: 1693586986008@@0.0.0.0@32769@dev
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
