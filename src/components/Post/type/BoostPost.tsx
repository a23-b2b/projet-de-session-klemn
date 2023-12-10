import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post, { IPost } from '../Post';
import { FaRetweet } from 'react-icons/fa6';
import styles from '../../../styles/BoostedPost.module.css'
import toast from 'react-hot-toast';

interface Props {
    post: IPost;
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

                })
                .catch((error) => {
                    toast.error('Une erreur est survenue');
                })
        });
    }

    if (boostedPostData) {
        return (
            <div>
                <span>
                    <FaRetweet className={styles.icone_boost} />
                    <Link to={`/u/${props.post.nomUtilisateur}`} className={styles.lien_utilisateur}>{props.post.nomAffichage}</Link> a partagé
                </span>
                <Post
                    idPost={boostedPostData.id_post}
                    date={boostedPostData.date_publication}
                    nomAffichage={boostedPostData.nom_affichage}
                    nomUtilisateur={boostedPostData.nom_utilisateur}
                    idCompte={boostedPostData.id_compte}
                    titre={boostedPostData.titre}
                    contenu={boostedPostData.contenu}
                    estMarkdown={boostedPostData.est_markdown}
                    nombreLike={boostedPostData.nombre_likes}
                    nombreDislike={boostedPostData.nombre_dislikes}
                    nombrePartage={boostedPostData.nombre_partages}
                    nombreCommentaire={boostedPostData.nombre_commentaires}
                    isPostFullScreen={false}
                    type={boostedPostData.id_type_post}
                    urlImageProfil={boostedPostData.url_image_profil}
                    userVote={boostedPostData.vote}
                    estModifie={boostedPostData.est_modifie}

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