import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";

export interface CollabProp {
    idPost: string;
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;

    idCollaborateur?: string;

    isPostFullScreen: Boolean;
}

function PosteQuestion(props: CollabProp) {
    
    function demanderCollabortion(props: CollabProp){
        const auth = getAuth();
        const user = auth.currentUser;

        if (user !== null) {
            const uid = user.uid;
            fetch(`/p/${props.idPost}/${uid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
        } else {

        }

        
    }

    

    return (
        <div className={styles.container}>
            <PostHeader
                date={props.date}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur} />

            <PostContent
                titre={props.titre}
                idPost={props.idPost}
                contenu={props.contenu}
                isPostFullScreen={props.isPostFullScreen} />

            
            <button onClick={() => demanderCollabortion(props)}>Demander à collaborer</button>       
            
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

export default PosteQuestion;