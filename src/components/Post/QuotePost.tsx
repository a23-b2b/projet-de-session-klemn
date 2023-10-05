import styles from '../../styles/QuotedPost.module.css'
import PostHeader from './Header';
import PostFooter from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';

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
    urlImageProfil: string;
    userVote: number;

    isPostFullScreen: Boolean;

    quotedPostId: string;
}

function QuotePost(props: Props) {
    const [quotedPostData, setQuotedPostData] = useState<any>();

    useEffect(() => {
        getQuotedPostData()
    }, [props.quotedPostId])

    function getQuotedPostData() {
        onAuthStateChanged(auth, (user) => {
            console.log(user?.uid)
            fetch(`${process.env.REACT_APP_API_URL}/single-post/${props.quotedPostId}`, {
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
                    console.log(error)
                })
        });
    }


    return (
        <div className={styles.container}>
            <PostHeader
                date={props.date}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur}
                urlImageProfil={props.urlImageProfil} />

            {quotedPostData && (
                <div className={styles.quoted_post_container}>
                    <div className={styles.header}>
                        <img className={styles.image_profil} src={quotedPostData.url_image_profil}></img>
                        <h4 className={styles.nom_affichage}>{quotedPostData.nom_affichage}</h4>

                    </div>
                </div>
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