import PosteBlogue from './Post/PosteBlogue';
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
    titre: string;
    contenu: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;

    isPostFullScreen: Boolean;

    type: number;

    // props optionnels
    statutReponse?: Boolean;
    idMeilleureReponse?: string;
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
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    nombrePartage={props.nombrePartage}
                    nombreCommentaire={props.nombreCommentaire}
                    isPostFullScreen={props.isPostFullScreen}
                    idPost={props.idPost} />

            )
            }
            {props.type == TYPE_REPONSE && (
                <Reponse idPost={props.idPost}
                         date={props.date}
                         nomAffichage={props.nomAffichage}
                         nomUtilisateur={props.nomUtilisateur}
                         contenu={props.contenu}
                         nombreLike={props.nombreLike}
                         nombreDislike={props.nombreDislike}
                         nombrePartage={props.nombrePartage}
                         nombreCommentaire={props.nombreCommentaire} />
            )
            }
        </>
    );
}

export default Post;