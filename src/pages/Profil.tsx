import { useParams } from 'react-router';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Profil.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PosteBlogue from '../components/Post/PosteBlogue';
import Post from '../components/Post';
import InfiniteScroll from "react-infinite-scroll-component";

function Profil() {
    const OFFSET = 6;

    let { username } = useParams();
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [dateCreationCompte, setDateCreationCompte] = useState('');
    const [nombreAbonnes, setNombreAbonnes] = useState(0);
    const [nombreAbonnements, setNombreAbonnements] = useState(0);
    const [bio, setBio] = useState('');
    const [urlImageProfil, setUrlImageProfil] = useState('');
    const [urlImageBanniere, setUrlImageBanniere] = useState('');

    const [idCompte, setIdCompte] = useState('')

    const [userPosts, setUserPosts] = useState<any[]>([])
    const [postOffset, setPostOffset] = useState(0)
    const [isEndOfFeed, setIsEndOfFeed] = useState(false)

    async function chargementInitial() {
        await fetch(`${process.env.REACT_APP_API_URL}/profil/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(response => {
                let data = response[0]

                if (!data) {
                    navigate("/404")
                }
                setIdCompte(data.id_compte)
                setNom(data.nom)
                setPrenom(data.prenom)
                setDisplayName(data.nom_affichage ? data.nom_affichage : username)
                setDateCreationCompte(data.date_creation_compte)
                setNombreAbonnes(data.nombre_abonnes)
                setNombreAbonnements(data.nombre_abonnements)
                setBio(data.biographie)
                setUrlImageProfil(data.url_image_profil)
                setUrlImageBanniere(data.url_image_banniere)

                setIdCompte(data.id_compte)

            }).catch((error) => {
                console.log(error)
            })
        getPosts()
    }

    async function getPosts() {
        console.log('Chargement des posts')
        await fetch(`${process.env.REACT_APP_API_URL}/user-posts/${idCompte}/${postOffset}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(response => {
                let data = response;

                setPostOffset(postOffset + OFFSET)

                if (data.length < OFFSET) {
                    setIsEndOfFeed(true)
                }

                setUserPosts(userPosts.concat(data));
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        chargementInitial();
    }, []);

    return (
        <div className={styles.flex}>

            <div className={styles.header}>
                <img className={styles.photo_banniere} src={urlImageBanniere} />

                <div className={styles.sous_banniere}>
                    <img className={styles.photo_profil} src={urlImageProfil} />

                    <div className={styles.infos_profil}>
                        <h2 className={styles.nom}>{displayName}</h2>
                        <p className={styles.username}>@{username}</p>
                        <button className={`${styles.bouton_follow} global_bouton`}>Suivre</button>
                    </div>

                </div>

                <div className={styles.follows}>
                    <div><p>{nombreAbonnes}</p> abonnés</div>
                    <div><p>{nombreAbonnements}</p> Abonnements</div>
                </div>

                <p className={styles.bio}>{bio}</p>
            </div>

            <InfiniteScroll
                dataLength={userPosts.length}
                next={() => getPosts()}
                hasMore={!isEndOfFeed} // Replace with a condition based on your data source
                loader={<p>Chargement...</p>}
                endMessage={<h1>Oh non! Vous avez terminé Klemn!</h1>}
            >
                {userPosts?.map(({
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
                    url_image_profil
                }) => {
                    return (
                        <Post
                            idPost={id_post}
                            idCompte={id_compte}
                            date={date_publication}
                            nomAffichage={displayName}
                            nomUtilisateur={username + ''}
                            titre={titre}
                            contenu={contenu}
                            nombreLike={nombre_likes}
                            nombreDislike={nombre_dislikes}
                            nombrePartage={nombre_partages}
                            nombreCommentaire={nombre_commentaires}
                            type={id_type_post}
                            isPostFullScreen={false}
                            urlImageProfil={urlImageProfil} />
                    )
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Profil;
