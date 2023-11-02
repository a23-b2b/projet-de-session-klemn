import { mysqlTable, varchar, int, datetime, tinyint, boolean, mysqlView } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";

export const post = mysqlTable("post", {
    id: varchar("id_post", { length: 255 }).primaryKey().notNull(),
    userId: varchar("id_compte", { length: 255 }).notNull().references(() => user.id),
    parentId: varchar("id_parent", { length: 255 }).references(() => post.id),
    postType: int("id_type_post"),
    title: varchar("titre", { length: 255 }),
    content: varchar("contenu", { length: 4000 }),
    est_markdown: boolean('est_markdown').notNull().default(false),
    likes: int("nombre_likes").notNull(),
    dislikes: int("nombre_dislikes").notNull(),
    reposts: int("nombre_reposts").notNull(),
    comments: int("nombre_commentaires").notNull(),
    shares: int("nombre_partages").notNull(),
    createdAt: datetime("date_publication"),
});

export const user = mysqlTable("compte", {
    id: varchar("id_compte", { length: 255 }).notNull().primaryKey(),
    email: varchar("courriel", { length: 255 }).notNull().unique(),
    createdAt: datetime("date_creation_compte").notNull(),
    firstName: varchar("prenom", { length: 255 }).notNull(),
    lastName: varchar("nom", { length: 255 }).notNull(),
    userName: varchar("nom_utilisateur", { length: 255 }).notNull().unique(),
    displayName: varchar("nom_affichage", { length: 255 }),
    bio: varchar("biographie", { length: 1000 }),
    profileImageUrl: varchar("url_image_profil", { length: 1000 }),
    profileBannerUrl: varchar("url_image_banniere", { length: 1000 }),
    permission: int("autorisation").notNull(),
    phone: varchar("telephone", { length: 20 }),
    followers: int("nombre_abonnes"),
    following: int("nombre_abonnements"),
});

export const follows = mysqlTable("compte_suivi", {
    followerId: varchar("id_compte", { length: 255 }).notNull().references(() => user.id),
    followedId: varchar("suit", { length: 255 }).notNull().references(() => user.id),
    followsSince: datetime("suit_depuis").notNull(),
});

export const vote = mysqlTable("vote", {
    userId: varchar("id_compte", { length: 255 }).notNull().references(() => user.id),
    postId: varchar("id_post", { length: 255 }).notNull().references(() => post.id),
    vote: int("score").notNull(),
});

export const share = mysqlTable("post_partage", {
    postId: varchar("id_post_original", { length: 255 }).notNull().references(() => post.id),
    sharedPostId: varchar("id_shared_post", { length: 255 }).notNull().references(() => post.id),
    isQuote: tinyint("is_quoted_post"),
});


///// ===== Tables collaboration/projet ===== \\\\\
export const project = mysqlTable("projet", {
    id: varchar("id_projet", { length: 255 }).primaryKey(),
    title: varchar("titre_projet", { length: 255 }),
    description: varchar("description_projet", { length: 255 }),
    repoUrl: varchar("url_repo_git", { length: 255 }),
    isOpen: boolean("est_ouvert", { length: 255 }),
    userId: varchar("compte_id_proprio", { length: 255 }).references(() => user.id),
});

export const collaboration = mysqlTable("post_collab", {
    id: varchar("id_collab", { length: 255 }).primaryKey(),
    projectId: varchar("projet_id_projet", { length: 255 }).references(() => project.id),
    postId: varchar("post_id_post", { length: 255 }).references(() => post.id),
});

export const collaborator = mysqlTable("collaborateur", {
    id: varchar("id_collaborateur", { length: 255 }).primaryKey(),
    userId: varchar("compte_id_compte", { length: 255 }).references(() => user.id),
    projectId: varchar("projet_id_projet", { length: 255 }).references(() => project.id),
});

export const collaborationRequest = mysqlTable("demande_collab", {
    id: varchar("id_demande_collab", { length: 255 }).primaryKey(),
    isAccepted: boolean("est_accepte").notNull().default(false),
    projectId: varchar("projet_id_projet", { length: 255 }).references(() => project.id),
    userId: varchar("id_collaborateur", { length: 255 }).references(() => user.id),
});


export const question = mysqlTable("post_question", {
    id: varchar("id_question", { length: 255 }).primaryKey(),
    postId: varchar("post_id_post", { length: 255 }).references(() => post.id),
    isSolved: boolean("est_resolu").notNull().default(false),
    answerPostId: varchar("post_meilleure_reponse", { length: 255 }).references(() => post.id),
});

export const badge = mysqlTable("badge", {
    userId: varchar("id_compte", { length: 255 }).notNull().references(() => user.id),
    badges: int("badges")
});
