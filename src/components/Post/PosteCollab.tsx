import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { IPost } from '../Post';

export interface PostCollab {
    post: IPost;
    estOuvert?: Boolean;
    idProjet?: string;
}

function PosteCollab(props: PostCollab) {
    const user = auth.currentUser;

    const [boutonActif, setBoutonActif] = useState(false)

    useEffect(() => {
        setBoutonActif(user?.uid != props.post.idCompte)
    }, [])

    function demanderCollabortion() {
        if (user) {
            user.getIdToken(true).then((idToken) => {
                fetch(`${process.env.REACT_APP_API_URL}/collab/p/${props.idProjet}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firebase_id_token: idToken
                    })
                }).then(() => {
                    setBoutonActif(false)
                    toast.success('Votre demande de collab a été envoyé');
                }).catch((error) => {
                    toast.error(error.code);
                })
            })
        }
    }



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


            {user && user.uid != props.post.idCompte &&
                <button className={'global_selected_bouton'} disabled={!boutonActif} onClick={() => demanderCollabortion()}>
                    Demander à collaborer
                </button>}

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

export default PosteCollab;