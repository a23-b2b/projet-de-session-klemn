import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";

export interface CollabProp {
    idPost: string;
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    estMarkdown: Boolean;
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
    const auth = getAuth();
    const user = auth.currentUser;

    const [boutonActif, setBoutonActif] = useState(false)

    useEffect(() => {
        setBoutonActif(user?.uid != props.idCompte)
    }, [])

    function demanderCollabortion(props: CollabProp){        
        if (user) {
            const uid = user.uid;
            user.getIdToken(true)
                .then((idToken) => {
                    console.log("Id Projet: (demanderCollaboration) "+ props.idProjet)
                    fetch(`${process.env.REACT_APP_API_URL}/collab/p/${props.idProjet}/${uid}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firebase_id_token: idToken
                        })             
                    }).then(response => response.json())
                        .then(response => {
                            toast.success('Votre demande de collab a été envoyé');
                        }).catch((error) => {
                            toast.error('Une erreur est survenue');
                    })
                })
        } 
    }

    

    return (
        <div className={'global_container_4'} id={styles["conteneur_post"]}>
            <PostHeader
                date={props.date}
                idPost={props.idPost}
                idCompte={props.idCompte}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur}
                urlImageProfil={props.urlImageProfil}
                isDeleted={false} />

            <PostContent
                titre={props.titre}
                idPost={props.idPost}
                contenu={props.contenu}
                estMarkdown={props.estMarkdown}
                isPostFullScreen={props.isPostFullScreen} />

            
            {user && 
                <button className={'global_selected_bouton'} disabled={!boutonActif} onClick={() => demanderCollabortion(props)}>
                    Demander à collaborer
                </button> }

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