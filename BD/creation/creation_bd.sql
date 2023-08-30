-- Active: 1693421920797@@0.0.0.0@32771@test
CREATE TABLE compte(  
    compte_id                       int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    heure_creation_compte           DATETIME,
    nom                             varchar(255),
    prenom                          varchar(255),
    nom_utilisateur                 varchar(255) NOT NULL,
    mot_de_passe                    varchar(1000) NOT NULL,
    courriel                        varchar(255),
    adresse                         varchar(100),
    code_postal                     varchar(100),
    telephone                       varchar(20),
    autorisation_id_autorisation    int NOT NULL,
    FOREIGN KEY (autorisation_id_autorisation) REFERENCES autorisation(id_autorisation)
);

CREATE TABLE autorisation (
    id_autorisation     int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre_autorisation  varchar(255)
);

CREATE TABLE droit (
    id_droit                        int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    chemin                          varchar(255) NOT NULL,
    autorisation_id_autorisation    int NOT NULL,
    FOREIGN KEY (autorisation_id_autorisation) REFERENCES autorisation(id_autorisation)
);
