import styles from '../styles/Home.module.css'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Post from '../components/Post';
import BlogueForm from '../components/BlogueForm';
import InfiniteScroll from 'react-infinite-scroll-component'

function Home() {
    const [postData, setPostData] = useState<any[]>([])
    const [cursor, setCursor] = useState(-1)
    const [isEndOfFeed, setIsEndOfFeed] = useState(false)
    const [feedType, setFeedType] = useState(localStorage.getItem("feedType") || "global");


    async function getGlobalPosts() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
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
        })
    }


    function getSubscribedPosts() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/post/followed/${cursor}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                    }).then(response => response.json()).then(response => {
                        let data = response["posts"]

                        console.log(`${process.env.REACT_APP_API_URL}/post/feed/${cursor}`)
                        console.log(response)

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
        });
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
        getPosts()
    }, [feedType]);

    return (
        <div className={styles.body}>
            <BlogueForm />

            <select value={feedType} onChange={e => changeFeedType(e.target.value)}>
                <option value="global">Global</option>
                <option value="followed">Abonnements</option>
            </select>

            <InfiniteScroll
                dataLength={postData.length}
                next={() => getPosts()}
                hasMore={!isEndOfFeed}
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
                        vote,
                        id_shared_post,
                        is_quoted_post,
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
                                    isSharedPostQuote={is_quoted_post} />
                            </div>

                        )
                    })}
                </div>

            </InfiniteScroll>
        </div>
    );

}

export default Home;
