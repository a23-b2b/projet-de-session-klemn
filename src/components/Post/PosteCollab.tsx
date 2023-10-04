import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useState } from 'react';

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

    isPostFullScreen: Boolean;
}

function PosteCollab(props: CollabProp) {
    const auth = getAuth();
    const user = auth.currentUser;
    
    var enabled = ActiverCollab();
    

    async function demanderCollabortion(props: CollabProp){        
        if (user !== null) {
            const uid = user.uid;
            fetch(`/p/${props.idPost}/${uid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }                
            })
        } 
    }

    function ActiverCollab() : Boolean{
        if (user !== null && props.idCompte !== user.uid) {
            return true;
        } else {
            return false;
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

            
            {<button disabled={!enabled} onClick={() => demanderCollabortion(props)}>Demander à collaborer</button>}
            
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