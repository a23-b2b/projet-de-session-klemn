import PosteBlogue from './type/PosteBlogue';
import PosteQuestion from './type/PosteQuestion';
import PosteCollab from './type/PosteCollab';
import Reponse from "./type/Reponse";
import QuotePost from './type/QuotePost';
import BoostPost from './type/BoostPost';
import DeletedPost from "./type/DeletedPost";

export const TYPE_BLOGUE = 1;
export const TYPE_QUESTION = 2;
export const TYPE_COLLABORATION = 3;
export const TYPE_REPONSE = 4;
export const TYPE_QUOTE_POST = 5;
export const TYPE_BOOST = 6 // boost est quand qqun partage et donc "insere" le post dans le feed des autres
export const TYPE_DELETED = 7; // un post qui a ete supprime, l'affichage sera different

export interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    urlImageProfil: string;
    titre: string;
    contenu: string;
    estMarkdown: Boolean;
    estModifie: Boolean;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    userVote: number;
    isPostFullScreen: Boolean;
    idCompte: string;
    type: number;

    // props optionnels
    statutReponse?: Boolean;
    idMeilleureReponse?: string;

    // props collab optionnels
    idProjet?: string;
    estOuvert?: Boolean; // va dependre du projet


    sharedPostId?: string;
    isSharedPostQuote?: boolean;
}

export interface IPost {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    urlImageProfil: string;
    titre: string;
    contenu: string;
    estMarkdown: Boolean;
    estModifie: Boolean;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    userVote: number;
    isPostFullScreen: Boolean;
    idCompte: string;
    type: number;
}

function Post(props: Props) {

    const post: IPost = {
        idPost: props.idPost,
        date: props.date,
        nomAffichage: props.nomAffichage,
        nomUtilisateur: props.nomUtilisateur,
        contenu: props.contenu,
        estMarkdown: props.estMarkdown,
        estModifie: props.estModifie,
        idCompte: props.idCompte,
        nombreLike: props.nombreLike,
        nombreDislike: props.nombreDislike,
        nombrePartage: props.nombrePartage,
        nombreCommentaire: props.nombreCommentaire,
        urlImageProfil: props.urlImageProfil,
        userVote: props.userVote,
        titre: props.titre,
        isPostFullScreen: props.isPostFullScreen,
        type: props.type
    }

    return (
        <>
            {post.type === TYPE_BLOGUE && (
                <PosteBlogue post={post} />
            )}

            {post.type === TYPE_REPONSE && (
                <Reponse post={post} />
            )}

            {post.type === TYPE_QUESTION && (
                <PosteQuestion
                    post={post}
                    idMeilleureReponse={props.idMeilleureReponse}
                    statutReponse={props.statutReponse}
                />
            )}

            {post.type === TYPE_COLLABORATION && (
                <PosteCollab
                    post={post}
                    estOuvert={props.estOuvert}
                    idProjet={props.idProjet}
                />
            )}

            {post.type === TYPE_QUOTE_POST && props.sharedPostId && props.isSharedPostQuote && (
                <QuotePost
                    post={post}
                    quotedPostId={props.sharedPostId}
                />
            )}

            {post.type === TYPE_BOOST && props.sharedPostId && !props.isSharedPostQuote && (
                <BoostPost
                    post={post}
                    boostedPostId={props.sharedPostId}
                />
            )}

            {post.type === TYPE_DELETED && (
                <DeletedPost post={post} />
            )}
        </>
    );
}

export default Post;