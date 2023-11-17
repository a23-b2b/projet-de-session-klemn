import styles from '../../styles/QuotedPost.module.css'
import PostHeader from './Header';
import PostFooter from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostContent from './Contenu';
import toast from 'react-hot-toast';
import {TYPE_DELETED} from "../Post";

interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
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

    isPostFullScreen: Boolean;

    quotedPostId: string;
}

function QuotePost(props: Props) {
    const navigate = useNavigate()
    const [quotedPostData, setQuotedPostData] = useState<any>();

    useEffect(() => {
        getQuotedPostData()
    }, [props.quotedPostId])

    function getQuotedPostData() {
        onAuthStateChanged(auth, (user) => {
            fetch(`${process.env.REACT_APP_API_URL}/post/${props.quotedPostId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: user?.uid || ""
                }
            })
                .then(response => response.json())
                .then(response => {
                    let data = response[0]

                    setQuotedPostData(data)
                })
                .catch((error) => {
                    toast.error(error.toString())
                })
        });
    }


    return (
        <div id={styles["conteneur"]} className={'global_conteneur_post'}>
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
                titre = {props.titre}
                estMarkdown={props.estMarkdown}
                contenu={props.contenu}
                idPost={props.idPost}
                isPostFullScreen={props.isPostFullScreen} />

            {quotedPostData && (
                <Link to={`/p/${quotedPostData.id_post}`} style={{ textDecoration: 'none' }}>

                    <div className={styles.quoted_post_container}>
                        <div className={styles.header}>
                            <img className={styles.image_profil} src={quotedPostData.url_image_profil}></img>
                            <h4 className={styles.nom_affichage}>{quotedPostData.nom_affichage}</h4>
                        </div>

                        <p className={styles.contenu}>{quotedPostData.contenu}</p>
                    </div>
                </Link>

            )}


            <PostFooter
                idPost={props.idPost}
                nombreLike={props.nombreLike}
                nombreDislike={props.nombreDislike}
                nombrePartage={props.nombrePartage}
                nombreCommentaire={props.nombreCommentaire}
                isPostFullScreen={props.isPostFullScreen}
                userVote={props.userVote} />
        </div>
    );
}

export default QuotePost;