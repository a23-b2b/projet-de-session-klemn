import { useNavigate } from 'react-router-dom';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Home.module.css'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import {TYPE_BLOGUE, TYPE_QUESTION , TYPE_COLLABORATION} from '../components/Post';

import Post from '../components/Post';

import BlogueForm from '../components/BlogueForm';
import InfiniteScroll from 'react-infinite-scroll-component'

function Home() {
    const navigate = useNavigate();

    const OFFSET = 6;


    const [postData, setPostData] = useState<any[]>([])
    const [postOffset, setPostOffset] = useState(0)
    const [isEndOfFeed, setIsEndOfFeed] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate('/authenticate')

        }
    });

    async function getPosts() {

        console.log('chargement des posts...')

        await fetch(`http://localhost:1111/feed-posts/${postOffset}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(response => {
                let data = response


                setPostOffset(postOffset + OFFSET)
                if (data.length < OFFSET) {
                    setIsEndOfFeed(true)
                }

                setPostData(postData.concat(data))

                console.log(postData)

            })
            .catch((error) => {
                toast.error(`Une erreur est survenue: ${error}`)
            })


    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <div className={styles.body}>
            <BlogueForm />

            <InfiniteScroll
                dataLength={postData.length}
                next={() => getPosts()}
                hasMore={!isEndOfFeed} // Replace with a condition based on your data source
                loader={<p>Chargement...</p>}
                endMessage={<h1>Oh non! Vous avez terminé Klemn!</h1>}
            >
                <div>
                    {postData?.map(({
                        contenu,
                        date_publication,
                        id_compte,
                        id_infos,
                        id_parent,
                        id_post,
                        id_type_post,
                        nombre_commentaires,
                        nombre_dislikes,
                        nombre_likes,
                        nombre_partages,
                        nombre_reposts,
                        titre,
                        nom_affichage,
                        nom_utilisateur,
                        url_image_profil,

                        // Question et Collab
                        post_meilleure_reponse,
                        est_resolu,

                        url_git,
                        est_ouvert,
                        id_collab
                    }) => {
                        return (<>
                        {id_type_post == TYPE_BLOGUE && (
                            <Post
                                date={date_publication}
                                nomAffichage={nom_affichage}
                                nomUtilisateur={nom_utilisateur}
                                titre={titre}
                                contenu={contenu}
                                idCompte={id_compte}
                                nombreLike={nombre_likes}
                                nombreDislike={nombre_dislikes}
                                nombrePartage={nombre_partages}
                                nombreCommentaire={nombre_commentaires}
                                isPostFullScreen={false}
                                idPost={id_post}
                                urlImageProfil={url_image_profil} 
                                type={id_type_post}/>
                        )}
                        {id_type_post == TYPE_QUESTION && (
                            <Post
                                date={date_publication}
                                nomAffichage={nom_affichage}
                                nomUtilisateur={nom_utilisateur}
                                titre={titre}
                                contenu={contenu}
                                idCompte={id_compte}
                                nombreLike={nombre_likes}
                                nombreDislike={nombre_dislikes}
                                nombrePartage={nombre_partages}
                                nombreCommentaire={nombre_commentaires}
                                isPostFullScreen={false}
                                idPost={id_post}
                                urlImageProfil={url_image_profil}
                                type={id_type_post}
                
                                // Question Prop
                                idMeilleureReponse={post_meilleure_reponse}
                                resolu={est_resolu} />
                        )}
                        {id_type_post == TYPE_COLLABORATION && (
                            <Post
                                date={date_publication}
                                nomAffichage={nom_affichage}
                                nomUtilisateur={nom_utilisateur}
                                titre={titre}
                                contenu={contenu}
                                idCompte={id_compte}
                                nombreLike={nombre_likes}
                                nombreDislike={nombre_dislikes}
                                nombrePartage={nombre_partages}
                                nombreCommentaire={nombre_commentaires}
                                isPostFullScreen={false}
                                idPost={id_post}
                                urlImageProfil={url_image_profil}
                                type={id_type_post}
                                
                                // Colllab Props
                                urlGit={url_git}
                                estOuvert={est_ouvert}
                                idCollab={id_collab} />
                        )}
                    </>)
                        {/*Les attribut optionnel ne sont jamais passee a leurs enfants!!!!*/}
                    })}
                </div>

            </InfiniteScroll>
        </div>
    );
}

export default Home;
