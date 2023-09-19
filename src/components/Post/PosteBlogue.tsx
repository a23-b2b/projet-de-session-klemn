import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';

export interface BlogueProp {
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
}

function PosteBlogue(props: BlogueProp) {

    return (
        <div className={styles.container}>
            <PostHeader
                date={props.date}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur} />

            <PostContent
                titre={props.titre}
                contenu={props.contenu}
                isPostFullScreen={props.isPostFullScreen} />

            <PostFooter
                nombreLike={props.nombreLike}
                nombreDislike={props.nombreDislike}
                nombrePartage={props.nombrePartage}
                nombreCommentaire={props.nombreCommentaire}
                isPostFullScreen={props.isPostFullScreen}
            />
        </div>
    );
}

export default PosteBlogue;