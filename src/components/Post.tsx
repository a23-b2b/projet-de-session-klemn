import styles from '../styles/Post.module.css'
import PostHeader from './Post/Header';
import PostContent from './Post/Contenu';
import PostFooter from './Post/Footer';


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
        <div className={styles.container}>
            {props.type == 1 && (
                <>
                    {/* <AnimatePresence> */}


                    <PostHeader date={props.date} nomAffichage={props.nomAffichage} nomUtilisateur={props.nomUtilisateur} />

                    <PostContent titre={props.titre} contenu={props.contenu} isPostFullScreen={props.isPostFullScreen} />

                    <PostFooter
                        nombreLike={props.nombreLike}
                        nombreDislike={props.nombreDislike}
                        nombrePartage={props.nombrePartage}
                        nombreCommentaire={props.nombreCommentaire}
                        isPostFullScreen={props.isPostFullScreen}
                    />
                </>
            )
            }
        </div >
    );
}

export default Post;