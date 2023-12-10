import styles from '../../../styles/Post.module.css'
import PostHeader from '../shared/Header';
import PostContent from '../shared/Contenu';
import PostFooter from '../shared/Footer';
import { IPost } from '../Post';

interface BlogueProps {
    post: IPost
}

function PosteBlogue(props: BlogueProps) {

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
                contenu={props.post.contenu}/>

            <PostContent
                titre={props.post.titre}
                idPost={props.post.idPost}
                contenu={props.post.contenu}
                estMarkdown={props.post.estMarkdown}
                isPostFullScreen={props.post.isPostFullScreen} />

            <PostFooter
                idPost={props.post.idPost}
                nombreLike={props.post.nombreLike}
                nombreDislike={props.post.nombreDislike}
                nombrePartage={props.post.nombrePartage}
                nombreCommentaire={props.post.nombreCommentaire}
                isPostFullScreen={props.post.isPostFullScreen} 
                userVote={props.post.userVote} />
        </div>
    );
}

export default PosteBlogue;