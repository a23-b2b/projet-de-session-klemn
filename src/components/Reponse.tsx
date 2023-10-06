import PostHeader from "./Post/Header";
import PostContent from "./Post/Contenu";
import PostFooter from "./Post/Footer";

export interface ReponseProps {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    contenu: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    urlImageProfil: string;
    userVote: number;
}

function Reponse(props: ReponseProps) {
    return (
        <div>
            <PostHeader date={props.date} nomAffichage={props.nomAffichage} nomUtilisateur={props.nomUtilisateur} urlImageProfil={props.urlImageProfil} />
            <PostContent contenu={props.contenu} idPost={props.idPost} isPostFullScreen={false} />
            <PostFooter idPost={props.idPost} nombreLike={props.nombreLike} nombreDislike={props.nombreDislike}
            nombrePartage={props.nombrePartage} nombreCommentaire={props.nombreCommentaire} isPostFullScreen={false} userVote={props.userVote} />
        </div>
    );
}

export default Reponse;