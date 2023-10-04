import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';

export interface QuestionProp {
    idPost: string;
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    urlImageProfil: string;

    idMeilleureReponse?: string;
    resolu?: Boolean;

    isPostFullScreen: Boolean;
}

function PosteQuestion(props: QuestionProp) {

    return (
        <div className={styles.container}>
            <PostHeader
                date={props.date}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur} 
                urlImageProfil={props.urlImageProfil} />

            <PostContent
                titre={props.titre}
                idPost={props.idPost}
                contenu={props.contenu}
                isPostFullScreen={props.isPostFullScreen} />

            {props.resolu && (<p>Résolu: {props.resolu.toString()}</p>)}

            { props.idMeilleureReponse && (
                <Link to={`/p/${props.idMeilleureReponse}`}>
                <p>Meilleure Réponse: {props.idMeilleureReponse}</p>            
                </Link>
            )}

            <PostFooter
                idPost={props.idPost}
                nombreLike={props.nombreLike}
                nombreDislike={props.nombreDislike}
                nombrePartage={props.nombrePartage}
                nombreCommentaire={props.nombreCommentaire}
                isPostFullScreen={props.isPostFullScreen}
            />
        </div>
    );
}

export default PosteQuestion;