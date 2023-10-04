import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../components/Post';
import SectionReponses from '../components/SectionReponses';
import styles from '../styles/PostFullScreen.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';


function PostFullScreen() {
    let { postId } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState<any>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user?.uid)
            fetch(`${process.env.REACT_APP_API_URL}/single-post/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: user?.uid || ""
                }
            })
                .then(response => response.json())
                .then(response => {
                    let data = response[0]
    
                    if (!data) {
                        navigate("/404")
                    }
    
                    setPostData(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        });

        
    }, [postId]);

    if (postData) {
        console.log(postData)
        return (
            <div className={styles.body}>
                <Post
                    idPost={postData.id_post}
                    date={postData.date_publication}
                    nomAffichage={postData.nom_affichage}
                    nomUtilisateur={postData.nom_utilisateur}
                    idCompte={postData.id_compte}
                    titre={postData.titre}
                    contenu={postData.contenu}
                    nombreLike={postData.nombre_likes}
                    nombreDislike={postData.nombre_dislikes}
                    nombrePartage={postData.nombre_partages}
                    nombreCommentaire={postData.nombre_commentaires}
                    isPostFullScreen={true}
                    type={postData.id_type_post}
                    urlImageProfil={postData.url_image_profil}
                    userVote={postData.vote} />

                <SectionReponses idParent={postData.id_post} />
            </div>
        );
    }

    return (
        <h2>La publication n'existe pas.</h2>
    )

}

export default PostFullScreen;
