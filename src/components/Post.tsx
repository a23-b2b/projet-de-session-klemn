import styles from '../styles/Post.module.css'
import PostHeader from './Post/Header';
import PostContent from './Post/Contenu';
import PostFooter from './Post/Footer';
import PosteBlogue from './Post/PosteBlogue';


interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    idCompte: string;
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
            {props.type == 1 && (

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
        </>
    );
}

export default Post;