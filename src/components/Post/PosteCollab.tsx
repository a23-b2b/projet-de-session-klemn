import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { getAuth } from "firebase/auth";
import toast from 'react-hot-toast';
import { useState } from "react";


export interface CollabProp {
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

    urlGit?: string;
    estOuvert?: Boolean;
    idCollab?: string;

    isPostFullScreen: Boolean;
}

function PosteCollab(props: CollabProp) {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const actif = true; //(user && props.idCompte !== user.uid) 

    async function demanderCollabortion(props: CollabProp){        
        if (user) {
            const uid = user.uid;
            user.getIdToken(true)
                .then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/collab/p/${props.idPostCollab}/${uid}`, {
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

            
            <button disabled={!actif} onClick={() => demanderCollabortion(props)}>Demander à collaborer</button>
            
            {props.urlGit !== null && props.estOuvert === true && ( 
                <a href={props.urlGit}>
                    URL de projet GitHub
                </a>
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

export default PosteCollab;