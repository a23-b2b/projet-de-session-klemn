import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import { IPost } from '../Post';

export interface PostQuestion {
    post: IPost;
    idMeilleureReponse?: string;
    statutReponse?: Boolean;
}

function PosteQuestion(props: PostQuestion) {

    return (
        <div className={'global_container_3'} id={styles["conteneur_post"]}>
            <PostHeader
                date={props.post.date}
                idPost={props.post.idPost}
                idCompte={props.post.idCompte}
                nomAffichage={props.post.nomAffichage}
                nomUtilisateur={props.post.nomUtilisateur}
                urlImageProfil={props.post.urlImageProfil}
                isDeleted={false}
                estModifie={props.post.estModifie}
                contenu={props.post.contenu} />

            <PostContent
                titre={props.post.titre}
                idPost={props.post.idPost}
                contenu={props.post.contenu}
                estMarkdown={props.post.estMarkdown}
                isPostFullScreen={props.post.isPostFullScreen} />

            {props.statutReponse && (<p>Résolu: {props.statutReponse.toString()}</p>)}

            {props.idMeilleureReponse && (
                <Link to={`/p/${props.idMeilleureReponse}`}>
                    <p>Meilleure Réponse: {props.idMeilleureReponse}</p>
                </Link>
            )}

            <PostFooter
                idPost={props.post.idPost}
                nombreLike={props.post.nombreLike}
                nombreDislike={props.post.nombreDislike}
                nombrePartage={props.post.nombrePartage}
                nombreCommentaire={props.post.nombreCommentaire}
                isPostFullScreen={props.post.isPostFullScreen}
                userVote={props.post.userVote}
            />
        </div>
    );
}

export default PosteQuestion;