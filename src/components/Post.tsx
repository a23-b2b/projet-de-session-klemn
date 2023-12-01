import PosteBlogue from './Post/PosteBlogue';
import PosteQuestion from './Post/PosteQuestion';
import PosteCollab from './Post/PosteCollab';
import Reponse from "./Reponse";
import QuotePost from './Post/QuotePost';
import BoostPost from './Post/BoostPost';
import DeletedPost from "./Post/DeletedPost";

export const TYPE_BLOGUE = 1;
export const TYPE_QUESTION = 2;
export const TYPE_COLLABORATION = 3;
export const TYPE_REPONSE = 4;
export const TYPE_QUOTE_POST = 5;
export const TYPE_BOOST = 6 // boost est quand qqun partage et donc "insere" le post dans le feed des autres
export const TYPE_DELETED = 7; // un post qui a ete supprime, l'affichage sera different

interface Props {
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
    statutReponse?: boolean;
    idMeilleureReponse?: string;

    // props collab optionnels
    idProjet?: string; 
    estOuvert?: Boolean; // va dependre du projet


    sharedPostId?: string;
    isSharedPostQuote?: boolean;
}

function Post(props: Props) {

    return (
        <>
            {props.type == TYPE_BLOGUE && (
                <PosteBlogue
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote} />
            )}
            {props.type == TYPE_REPONSE && (
                <Reponse idPost={props.idPost}
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote} />
            )}
            {props.type === TYPE_QUESTION && (
                <PosteQuestion
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote}

                    // Question Prop
                    idMeilleureReponse={props.idMeilleureReponse}
                    statutReponse={props.statutReponse} />
            )}
            {props.type === TYPE_COLLABORATION && (
                <PosteCollab
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote}

                    // Collab Prop
                    estOuvert={props.estOuvert}
                    idProjet={props.idProjet}
                />
            )}

            {props.type === TYPE_QUOTE_POST && props.sharedPostId && props.isSharedPostQuote && (
                <QuotePost
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote} 

                    quotedPostId={props.sharedPostId}
                />
            )}

            {props.type === TYPE_BOOST && props.sharedPostId && !props.isSharedPostQuote && (
                <BoostPost
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    idCompte={props.idCompte}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}

                    boostedPostId={props.sharedPostId}
                />
            )}

            {props.type === TYPE_DELETED && (
                <DeletedPost
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    estMarkdown={props.estMarkdown}
                    estModifie={props.estModifie}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}
                    userVote={props.userVote} />
            )}
        </>
    );
}

export default Post;