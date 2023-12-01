import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export interface CollabProp {
    idPost: string;
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    estMarkdown: Boolean;
    estModifie: Boolean;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    urlImageProfil: string;
    userVote: number;

    estOuvert?: Boolean;
    idProjet?: string;

    isPostFullScreen: Boolean;
}

function PosteCollab(props: CollabProp) {
    const user = auth.currentUser;

    const [boutonActif, setBoutonActif] = useState(false)

    useEffect(() => {
        setBoutonActif(user?.uid != props.idCompte)
    }, [])

    function demanderCollabortion(props: CollabProp) {
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
                date={props.date}
                idPost={props.idPost}
                idCompte={props.idCompte}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur}
                urlImageProfil={props.urlImageProfil}
                isDeleted={false}
                estModifie={props.estModifie}
                contenu={props.contenu} />

            <PostContent
                titre={props.titre}
                idPost={props.idPost}
                contenu={props.contenu}
                estMarkdown={props.estMarkdown}
                isPostFullScreen={props.isPostFullScreen} />


            {user && user.uid != props.idCompte &&
                <button className={'global_selected_bouton'} disabled={!boutonActif} onClick={() => demanderCollabortion(props)}>
                    Demander à collaborer
                </button>}

            <PostFooter
                idPost={props.idPost}
                nombreLike={props.nombreLike}
                nombreDislike={props.nombreDislike}
                nombrePartage={props.nombrePartage}
                nombreCommentaire={props.nombreCommentaire}
                isPostFullScreen={props.isPostFullScreen}
                userVote={props.userVote}
            />
        </div>
    );
}

export default PosteCollab;