import { Link } from 'react-router-dom';
import styles from '../../styles/Post.module.css'
import { Tooltip } from "@chakra-ui/react"
import {Menu, MenuDivider, MenuItem} from "@szhsin/react-menu";
import {SlOptionsVertical} from "react-icons/sl";
import {MdDeleteForever} from "react-icons/md";
import {auth} from "../../firebase";
import toast from "react-hot-toast";

interface HeaderProps {
    date: string;
    idPost: string;
    idCompte: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}


const UNE_MINUTE_EN_SECONDES = 60
const UNE_HEURE_EN_SECONDES = 3600
const UN_JOUR_EN_SECONDES = 86400
const DEUX_SEMAINES_EN_SECONDES = 1209600


const PostHeader = (props: HeaderProps) => {

    const datePost = new Date(props.date)
    const datePostUTC = new Date(Date.UTC(datePost.getUTCFullYear(), datePost.getUTCMonth(), datePost.getUTCDate(), datePost.getUTCHours() - datePost.getTimezoneOffset() / 60, datePost.getUTCMinutes(), datePost.getUTCSeconds()))
    const datePostSeconds = Math.round(datePostUTC.getTime() / 1000)

    const dateNow = new Date()
    const dateNowUTC = new Date(dateNow.toISOString())
    const dateNowSeconds = Math.round(dateNowUTC.getTime() / 1000)

    const timeDifference = dateNowSeconds - datePostSeconds

    const formattedData = datePostUTC.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

    const estProprietaire = auth.currentUser ? auth.currentUser.uid === props.idCompte : false

    let timeStampText = ""
    // afficher en secondes
    if (timeDifference >= 0 && timeDifference < UNE_MINUTE_EN_SECONDES) {
        timeStampText = `${timeDifference}s`
    }

    // afficher en minutes
    if (timeDifference >= UNE_MINUTE_EN_SECONDES && timeDifference < UNE_HEURE_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60)} min`
    }

    // afficher en heures
    if (timeDifference >= UNE_HEURE_EN_SECONDES && timeDifference < UN_JOUR_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60 / 60)}h`
    }

    // afficher quand il y a 1 jour. multiplier par 1.5 pour contrer l'effet du Round
    if (timeDifference >= UN_JOUR_EN_SECONDES && timeDifference < UN_JOUR_EN_SECONDES * 1.5) {
        timeStampText = `${Math.round(timeDifference / 60 / 60 / 24)} jour`
    }

    // afficher en jours
    if (timeDifference >= UN_JOUR_EN_SECONDES * 1.5 && timeDifference < DEUX_SEMAINES_EN_SECONDES) {
        timeStampText = `${Math.round(timeDifference / 60 / 60 / 24)} jours`
    }

    // la date
    if (timeDifference >= DEUX_SEMAINES_EN_SECONDES) {
        timeStampText = datePost.toLocaleDateString()
    }

    console.log(props.urlImageProfil)

    function handleOptionsItemClick(item: string) {
        // Ce switch permettrait d'implémenter plus d'options dans le futur
        switch (item) {
            case 'delete':
                handleDeletePost()
                break;
            default:
                break;
        }
    }

    function handleDeletePost() {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?");

        if (confirmDelete) {
            // const utilisateur = auth.currentUser;
            // if (utilisateur) {
            //     utilisateur.getIdToken(/* forceRefresh */ true)
            //         .then((idToken) => {
            //             fetch(`${process.env.REACT_APP_API_URL}/post/${props.idPost}`, {
            //                 method: 'DELETE',
            //                 headers: {
            //                     'authorization': idToken
            //                 },
            //             }).then(response => response.json())
            //                 .then(response => {
            //                     toast.success('La publication à été supprimée!');
            //
            //                 }).catch((error) => {
            //                 toast.error('Une erreur est survenue');
            //             })
            //         })
            // }
        }
    }

    return (
        <div className={styles.header}>
            <Link to={`/u/${props.nomUtilisateur}`}>
                <img className={styles.image_profil} src={props.urlImageProfil} />
            </Link>

            <div id={styles["inner_droit_nom_utilisateur"]}>
                <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                    <p className={styles.display_name}>{props.nomAffichage}</p>
                    <p className={styles.username}>@{props.nomUtilisateur}</p>
                </Link>
            </div>

            <Tooltip className={styles.tooltip} label={formattedData} placement='top'>
                <p className={styles.date}>{timeStampText}</p>
            </Tooltip>

            <Menu menuButton={
                <div className={styles.bouton_interraction} id={styles.bouton_interraction_options}>
                    <SlOptionsVertical className={styles.icone} id={styles.icone_options} />
                </div>
            }
                  transition={true}
                  menuClassName={styles.share_menu}
                  onItemClick={(e) => handleOptionsItemClick(e.value)}>

                {estProprietaire && (
                    <MenuItem value={'delete'} className={styles.share_menu_item}><MdDeleteForever className={styles.share_menu_icon} id={styles.icone_supprimer} /><span>Supprimer</span></MenuItem>
                )}
                <MenuItem className={styles.share_menu_item}><span>Rien</span></MenuItem>

            </Menu>
        </div>
    )
}

export default PostHeader;