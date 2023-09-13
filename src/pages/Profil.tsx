import { useParams } from 'react-router';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Profil.module.css'
import { useEffect, useState } from 'react';

function Profil() {
    let { username } = useParams();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [dateCreationCompte, setDateCreationCompte] = useState('');    
    const [nombreAbonnes, setNombreAbonnes] = useState(0);
    const [nombreAbonnements, setNombreAbonnements] = useState(0);
    const [bio, setBio] = useState('');
    const [urlImageProfil,setUrlImageProfil] = useState('');
    const [urlImageBanniere, setUrlImageBanniere] = useState('');

    useEffect(() => {  
        fetch(`http://localhost:1111/profil/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(response => {
            let data = response[0]
            setNom(data.nom)
            setPrenom(data.prenom)
            setDisplayName(data.nom_affichage ? data.nom_affichage : username)
            setDateCreationCompte(data.date_creation_compte)
            setNombreAbonnes(data.nombre_abonnes)
            setNombreAbonnements(data.nombre_abonnements)
            setBio(data.biographie)
            setUrlImageProfil(data.url_image_profil)
            setUrlImageBanniere(data.url_image_banniere)
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

            <div className={styles.content}>
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
            </div>
        </div>
    );
}

export default Profil;
