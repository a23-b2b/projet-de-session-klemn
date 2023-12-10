import styles from '../../../styles/QuotedPost.module.css'
import PostHeader from '../shared/Header';
import PostFooter from '../shared/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostContent from '../shared/Contenu';
import toast from 'react-hot-toast';
import { IPost } from "../Post";

interface Props {
    post: IPost;
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
                estMarkdown={props.post.estMarkdown}
                contenu={props.post.contenu}
                idPost={props.post.idPost}
                isPostFullScreen={props.post.isPostFullScreen} />

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
                idPost={props.post.idPost}
                nombreLike={props.post.nombreLike}
                nombreDislike={props.post.nombreDislike}
                nombrePartage={props.post.nombrePartage}
                nombreCommentaire={props.post.nombreCommentaire}
                isPostFullScreen={props.post.isPostFullScreen}
                userVote={props.post.userVote} />
        </div>
    );
}

export default QuotePost;