import { useNavigate } from 'react-router-dom';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Home.module.css'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
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
                endMessage={<p>No more data to load.</p>}
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
                        nom_utilisateur
                    }) => {
                        return (
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
                                isPostFullScreen={false} />
                        )
                    })}
                </div>

            </InfiniteScroll>
        </div>
    );
}

export default Home;
