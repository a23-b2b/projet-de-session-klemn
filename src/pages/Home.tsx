import styles from '../styles/Home.module.css'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Post from '../components/Post';
import BlogueForm from '../components/BlogueForm';
import InfiniteScroll from 'react-infinite-scroll-component'
import Chargement from '../components/EcranChargement';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const [postData, setPostData] = useState<any[]>([])
    const [cursor, setCursor] = useState(-1)
    const [isEndOfFeed, setIsEndOfFeed] = useState(false)
    const [feedType, setFeedType] = useState(localStorage.getItem("feedType") || "global");



    async function getGlobalPosts() {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(`${process.env.REACT_APP_API_URL}/post/feed/${cursor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
            }).then(response => response.json()).then(response => {
                let data = response["posts"]  

                let newCursor = parseInt(response.newCursor)

                setCursor(newCursor)

                if (!newCursor) {
                    setIsEndOfFeed(true)
                }

                setPostData(postData.concat(data))

            }).catch((error) => {
                toast.error(`Une erreur est survenue: ${error}`)
            })
        })
    }

    function getSubscribedPosts() {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(`${process.env.REACT_APP_API_URL}/post/followed/${cursor}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
            }).then(response => response.json()).then(response => {
                let data = response["posts"]

                let newCursor = parseInt(response.newCursor)

                setCursor(newCursor)

                if (!newCursor) {
                    setIsEndOfFeed(true)
                }

                setPostData(postData.concat(data))

            }).catch((error) => {
                toast.error(`Une erreur est survenue: ${error}`)
            })
        })
    }


    function getPosts() {
        let localStorageFeedType = localStorage.getItem("feedType")

        switch (localStorageFeedType) {
            case "followed":
                getSubscribedPosts();
                break;
            case "global":
                getGlobalPosts();
                break;
            default:
                getGlobalPosts()
                break;
        }
    }

    function changeFeedType(type: any) {
        console.info("Changing feed to", type)
        localStorage.setItem("feedType", type.toString())
        setFeedType(type)

        setCursor(-1)
        setPostData([])
        setIsEndOfFeed(false)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/authenticate')

            else getPosts()
        });
    }, [feedType]);

    return (
        
        <div className={styles.body}>
            <BlogueForm />

            <div className={styles.conteneurBoutons}>
                <button className={feedType === "global" ? 'global_selected_bouton' : 'global_unselected_bouton'} onClick={e =>  {
                  changeFeedType("global");
                }}>Global</button>
                <button id={styles["boutonAbonnement"]} className={feedType === "followed"  ? 'global_selected_bouton' : 'global_unselected_bouton'}  onClick={e =>  {
                  changeFeedType("followed");
                }}>Abonnements</button>
            </div>

            <InfiniteScroll
                dataLength={postData.length}
                next={() => getPosts()}
                hasMore={!isEndOfFeed} // Replace with a condition based on your data source
                loader={<Chargement />}
                endMessage={<h1>Oh non! Vous avez terminé Klemn!</h1>}
            >
                <div>
                    {postData?.map(({
                        contenu,
                        est_markdown,
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
                        vote,
                        id_shared_post,
                        is_quoted_post,
                        
                        est_resolu,
                        post_meilleure_reponse,
                        
                        projet_id_projet,
                        est_ouvert,
                        est_modifie
                    }) => {
                        return (
                            <div key={id_post}>
                                <Post
                                    idPost={id_post}
                                    date={date_publication}
                                    nomAffichage={nom_affichage}
                                    nomUtilisateur={nom_utilisateur}
                                    titre={titre}
                                    contenu={contenu}
                                    estMarkdown={est_markdown}
                                    estModifie={est_modifie}
                                    idCompte={id_compte}
                                    nombreLike={nombre_likes}
                                    nombreDislike={nombre_dislikes}
                                    nombrePartage={nombre_partages}
                                    nombreCommentaire={nombre_commentaires}
                                    type={id_type_post}
                                    isPostFullScreen={false}
                                    urlImageProfil={url_image_profil}
                                    userVote={vote}

                                    sharedPostId={id_shared_post}
                                    isSharedPostQuote={is_quoted_post}
                                    
                                    idProjet={projet_id_projet}
                                    estOuvert={est_ouvert}
                                    
                                    statutReponse={est_resolu}
                                    idMeilleureReponse={post_meilleure_reponse}/>
                            </div>

                        )
                    })}
                </div>

            </InfiniteScroll>
        </div>
    );

}

export default Home;
