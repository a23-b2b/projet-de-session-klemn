import PosteBlogue from './Post/PosteBlogue';
import PosteQuestion from './Post/PosteQuestion';
import PosteCollab from './Post/PosteCollab';
import Reponse from "./Reponse";

export const TYPE_BLOGUE = 1;
export const TYPE_QUESTION = 2;
export const TYPE_COLLABORATION = 3;
export const TYPE_REPONSE = 4;

interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    urlImageProfil: string;
    titre: string;
    contenu: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;

    isPostFullScreen: Boolean;
    idCompte: string;
    type: number;

    // props question optionnels
    resolu?: Boolean;
    idMeilleureReponse?: string;

    // props collab optionnels
    urlGit?: string; 
    estOuvert?: Boolean;
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
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil} />
            )}
            {props.type == TYPE_REPONSE && (
                <Reponse idPost={props.idPost}
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    contenu={props.contenu}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    urlImageProfil={props.urlImageProfil} />
            )}
            {props.type == TYPE_QUESTION && (
                <PosteQuestion
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}

                    // Question Prop
                    idMeilleureReponse={props.idMeilleureReponse}
                    resolu={props.resolu} />
            )}
            {props.type == TYPE_COLLABORATION && (
                <PosteCollab
                    date={props.date}
                    nomAffichage={props.nomAffichage}
                    nomUtilisateur={props.nomUtilisateur}
                    titre={props.titre}
                    contenu={props.contenu}
                    idCompte={props.idCompte}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost}
                    urlImageProfil={props.urlImageProfil}

                    // Colllab Props
                    urlGit={props.urlGit}
                    estOuvert={props.estOuvert}
                />
            )}
        </>
    );
}

export default Post;