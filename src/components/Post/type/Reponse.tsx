import PostHeader from "../shared/Header";
import PostContent from "../shared/Contenu";
import PostFooter from "../shared/Footer";
import { IPost } from "../Post";

interface ReponseProps {
    post: IPost
}

function Reponse(props: ReponseProps) {
    return (
        <div>
            <PostHeader date={props.post.date} idPost={props.post.idPost} idCompte={props.post.idCompte} nomAffichage={props.post.nomAffichage} nomUtilisateur={props.post.nomUtilisateur} urlImageProfil={props.post.urlImageProfil} isDeleted={false} estModifie={props.post.estModifie} contenu={props.post.contenu}/>
            <PostContent titre={""} contenu={props.post.contenu} estMarkdown={props.post.estMarkdown} idPost={props.post.idPost} isPostFullScreen={false} />
            <PostFooter idPost={props.post.idPost} nombreLike={props.post.nombreLike} nombreDislike={props.post.nombreDislike}
                nombrePartage={props.post.nombrePartage} nombreCommentaire={props.post.nombreCommentaire} isPostFullScreen={false} userVote={props.post.userVote} />
        </div>
    );
}

export default Reponse;