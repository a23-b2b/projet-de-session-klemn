import { useParams } from 'react-router';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Profil.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PosteBlogue from '../components/Post/PosteBlogue';
import Post from '../components/Post';

function Profil() {
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
    const [loadingPosts, setLoadingPosts] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:1111/profil/${username}`, {
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

                return data.id_compte;

            }).then((userId) => {
                fetch(`http://localhost:1111/user-posts/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => response.json())
                    .then(response => {
                        let data = response;

                        setUserPosts(data);
                        setLoadingPosts(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })



    }, [username]);

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

            {loadingPosts && (
                <div>Chargement...</div>
            )}

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
                titre
            }) => {
                return (
                    <Post
                        idPost={id_post}
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
                        isPostFullScreen={false} />
                )
            })}

        </div>
    );
}

export default Profil;
