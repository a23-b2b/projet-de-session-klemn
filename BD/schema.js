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

export const collaboration = mysqlTable("post_collab", {
    id: varchar("id_collab", { length: 255 }).primaryKey(),
    isOpen: boolean("est_ouvert").notNull().default(true),
    projectUrl: varchar("url_git", { length: 255 }),
    postId: varchar("post_id_post", { length: 255 }).references(() => post.id),
});

export const collaborationRequest = mysqlTable("demande_collab", {
    id: varchar("id_demande_collab", { length: 255 }).primaryKey(),
    isAccepted: boolean("est_accepte").notNull().default(false),
    collaborationId: varchar("post_collab_id_collab", { length: 255 }).references(() => collaboration.id, {onDelete: 'cascade'}),
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

export const postView = mysqlView("post_view")
    .as((qb) => qb
        .select({
            id: post.id,
            createdAt: post.createdAt,
            userId: post.userId,
            parentId: post.parentId,
            postType: post.postType,
            title: post.title,
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            reposts: post.reposts,
            shares: post.shares,
            collabGitUrl: collaboration.projectUrl,
            collabId: collaboration.id,
            questionIsSolved: question.isSolved,
            questionBestAnswer: question.answerPostId,
            userDisplayName: user.displayName,
            userUserName: user.userName,
            userProfileImage: user.profileImageUrl
        })
        .from(post)
        .leftJoin(collaboration, eq(post.id, collaboration.postId))
        .leftJoin(question, eq(post.id, question.postId))
        .leftJoin(share, eq(post.id, share.postId))
        .innerJoin(user, eq(post.userId, user.id))
    );