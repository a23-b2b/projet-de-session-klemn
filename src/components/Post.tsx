import styles from '../styles/Post.module.css'
import PostHeader from './Post/Header';
import PostContent from './Post/Contenu';
import PostFooter from './Post/Footer';
import PosteBlogue from './Post/PosteBlogue';
import PosteQuestion from './Post/PosteQuestion';
import PosteCollab from './Post/PosteCollab';

const typeCollab = 3;
const typeQuestion = 2;
const typeBlogue = 1;

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

    idCollaborateur?: string;
}

function Post(props: Props) {

    return (
        <>            
            {props.type == typeBlogue && (

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

            )}
            {props.type === typeQuestion && (
                <PosteQuestion
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
                    idPost={props.idPost} 
                    
                    // Question Prop
                    idMeilleureReponse={props.idMeilleureReponse}
                    statutReponse={props.statutReponse} />                
            )}
            {props.type === typeCollab && (
                <PosteCollab
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
                    idPost={props.idPost} 

                    // Collab Prop
                    idCollaborateur={props.idCollaborateur}
                />
            )}   
        </>
    );
}

export default Post;