import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../Post';
import { FaRetweet } from 'react-icons/fa6';
import styles from '../../styles/BoostedPost.module.css'

interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    idCompte: string;
    urlImageProfil: string;

    isPostFullScreen: Boolean;

    boostedPostId: string;
}

function BoostPost(props: Props) {
    const navigate = useNavigate()
    const [boostedPostData, setBoostedPostData] = useState<any>();

    useEffect(() => {
        getSharedboostedPostData()
    }, [props.boostedPostId])

    function getSharedboostedPostData() {
        onAuthStateChanged(auth, (user) => {
            console.log(user?.uid)
            fetch(`${process.env.REACT_APP_API_URL}/post/${props.boostedPostId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: user?.uid || ""
                }
            })
                .then(response => response.json())
                .then(response => {
                    let data = response[0]

                    setBoostedPostData(data)

                    console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        });
    }

    if (boostedPostData) {
        return (
            <div>
                <span id={styles["boutonCollab"]}>
                    <FaRetweet className={styles.icone_boost}/>
                    <Link to={`/u/${props.nomUtilisateur}`} className={styles.lien_utilisateur}>{props.nomAffichage}</Link> a partagé
                </span>
                <Post
                    idPost={boostedPostData.id_post}
                    date={boostedPostData.date_publication}
                    nomAffichage={boostedPostData.nom_affichage}
                    nomUtilisateur={boostedPostData.nom_utilisateur}
                    idCompte={boostedPostData.id_compte}
                    titre={boostedPostData.titre}
                    contenu={boostedPostData.contenu}
                    nombreLike={boostedPostData.nombre_likes}
                    nombreDislike={boostedPostData.nombre_dislikes}
                    nombrePartage={boostedPostData.nombre_partages}
                    nombreCommentaire={boostedPostData.nombre_commentaires}
                    isPostFullScreen={false}
                    type={boostedPostData.id_type_post}
                    urlImageProfil={boostedPostData.url_image_profil}
                    userVote={boostedPostData.vote}
    
                    sharedPostId={boostedPostData.id_shared_post}
                    isSharedPostQuote={boostedPostData.is_quoted_post} />
            </div>
        );
    }

    return (
        <h2>La publication n'existe pas.</h2>
    )
}

export default BoostPost;