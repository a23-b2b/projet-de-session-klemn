CREATE TABLE `post_collab` (
	`id_collab` varchar(255) NOT NULL,
	`est_ouvert` boolean NOT NULL DEFAULT true,
	`url_git` varchar(255),
	`post_id_post` varchar(255),
	CONSTRAINT `post_collab_id_collab` PRIMARY KEY(`id_collab`)
);
--> statement-breakpoint
CREATE TABLE `demande_collab` (
	`id_demande_collab` varchar(255) NOT NULL,
	`est_accepte` boolean NOT NULL DEFAULT false,
	`post_collab_id_collab` varchar(255),
	`id_collaborateur` varchar(255),
	CONSTRAINT `demande_collab_id_demande_collab` PRIMARY KEY(`id_demande_collab`)
);
--> statement-breakpoint
CREATE TABLE `compte_suivi` (
	`id_compte` varchar(255) NOT NULL,
	`suit` varchar(255) NOT NULL,
	`suit_depuis` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id_post` varchar(255) NOT NULL,
	`id_compte` varchar(255) NOT NULL,
	`id_parent` varchar(255),
	`id_type_post` int,
	`titre` varchar(255),
	`contenu` varchar(255),
	`nombre_likes` int NOT NULL,
	`nombre_dislikes` int NOT NULL,
	`nombre_reposts` int NOT NULL,
	`nombre_commentaires` int NOT NULL,
	`nombre_partages` int NOT NULL,
	`date_publication` datetime,
	CONSTRAINT `post_id_post` PRIMARY KEY(`id_post`)
);
--> statement-breakpoint
CREATE TABLE `post_question` (
	`id_question` varchar(255) NOT NULL,
	`post_id_post` varchar(255),
	`est_resolu` boolean NOT NULL DEFAULT false,
	`post_meilleure_reponse` varchar(255),
	CONSTRAINT `post_question_id_question` PRIMARY KEY(`id_question`)
);
--> statement-breakpoint
CREATE TABLE `post_partage` (
	`id_post_original` varchar(255) NOT NULL,
	`id_shared_post` varchar(255) NOT NULL,
	`is_quoted_post` tinyint
);
--> statement-breakpoint
CREATE TABLE `compte` (
	`id_compte` varchar(255) NOT NULL,
	`courriel` varchar(255) NOT NULL,
	`date_creation_compte` datetime NOT NULL,
	`prenom` varchar(20),
	`nom` varchar(255) NOT NULL,
	`nom_utilisateur` varchar(255) NOT NULL,
	`nom_affichage` varchar(255),
	`biographie` varchar(1000),
	`url_image_profil` varchar(1000),
	`url_image_banniere` varchar(1000),
	`autorisation` int NOT NULL,
	`nombre_abonnes` int,
	`nombre_abonnements` int,
	CONSTRAINT `compte_id_compte` PRIMARY KEY(`id_compte`),
	CONSTRAINT `compte_courriel_unique` UNIQUE(`courriel`),
	CONSTRAINT `compte_nom_utilisateur_unique` UNIQUE(`nom_utilisateur`)
);
--> statement-breakpoint
CREATE TABLE `vote` (
	`id_compte` varchar(255) NOT NULL,
	`id_post` varchar(255) NOT NULL,
	`score` int NOT NULL
);
--> statement-breakpoint
ALTER TABLE `post_collab` ADD CONSTRAINT `post_collab_post_id_post_post_id_post_fk` FOREIGN KEY (`post_id_post`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `demande_collab` ADD CONSTRAINT `demande_collab_post_collab_id_collab_post_collab_id_collab_fk` FOREIGN KEY (`post_collab_id_collab`) REFERENCES `post_collab`(`id_collab`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `demande_collab` ADD CONSTRAINT `demande_collab_id_collaborateur_compte_id_compte_fk` FOREIGN KEY (`id_collaborateur`) REFERENCES `compte`(`id_compte`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `compte_suivi` ADD CONSTRAINT `compte_suivi_id_compte_compte_id_compte_fk` FOREIGN KEY (`id_compte`) REFERENCES `compte`(`id_compte`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `compte_suivi` ADD CONSTRAINT `compte_suivi_suit_compte_id_compte_fk` FOREIGN KEY (`suit`) REFERENCES `compte`(`id_compte`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post` ADD CONSTRAINT `post_id_compte_compte_id_compte_fk` FOREIGN KEY (`id_compte`) REFERENCES `compte`(`id_compte`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post` ADD CONSTRAINT `post_id_parent_post_id_post_fk` FOREIGN KEY (`id_parent`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_question` ADD CONSTRAINT `post_question_post_id_post_post_id_post_fk` FOREIGN KEY (`post_id_post`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_question` ADD CONSTRAINT `post_question_post_meilleure_reponse_post_id_post_fk` FOREIGN KEY (`post_meilleure_reponse`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_partage` ADD CONSTRAINT `post_partage_id_post_original_post_id_post_fk` FOREIGN KEY (`id_post_original`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_partage` ADD CONSTRAINT `post_partage_id_shared_post_post_id_post_fk` FOREIGN KEY (`id_shared_post`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vote` ADD CONSTRAINT `vote_id_compte_compte_id_compte_fk` FOREIGN KEY (`id_compte`) REFERENCES `compte`(`id_compte`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vote` ADD CONSTRAINT `vote_id_post_post_id_post_fk` FOREIGN KEY (`id_post`) REFERENCES `post`(`id_post`) ON DELETE no action ON UPDATE no action;