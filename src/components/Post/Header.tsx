import { Link } from 'react-router-dom';
import styles from '../../styles/Post.module.css'
import { getAuth } from "firebase/auth";
import { useState } from 'react';

import { Tooltip } from "@chakra-ui/react"
import BadgesContainer from '../Badges/_BadgesContainer';

interface HeaderProps {
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}


const UNE_MINUTE_EN_SECONDES = 60
const UNE_HEURE_EN_SECONDES = 3600
const UN_JOUR_EN_SECONDES = 86400
const DEUX_SEMAINES_EN_SECONDES = 1209600


const PostHeader = (props: HeaderProps) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const datePost = new Date(props.date)
    const datePostUTC = new Date(Date.UTC(datePost.getUTCFullYear(), datePost.getUTCMonth(), datePost.getUTCDate(), datePost.getUTCHours() - datePost.getTimezoneOffset() / 60, datePost.getUTCMinutes(), datePost.getUTCSeconds()))
    const datePostSeconds = Math.round(datePostUTC.getTime() / 1000)

    const dateNow = new Date()
    const dateNowUTC = new Date(dateNow.toISOString())
    const dateNowSeconds = Math.round(dateNowUTC.getTime() / 1000)

    const timeDifference = dateNowSeconds - datePostSeconds

    const formattedData = datePostUTC.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

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

    return (
        <div className={styles.header}>
            <Link to={`/u/${props.nomUtilisateur}`}>
                <img className={styles.image_profil} src={props.urlImageProfil} />
            </Link>

            <div id={styles["inner_droit_nom_utilisateur"]}>
                <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                    <p className={styles.display_name}>{props.nomAffichage}</p>
                    {/* <BadgesContainer badgesInt={15}/> */}
                    <p className={styles.username}>@{props.nomUtilisateur}</p>
                </Link>
            </div>

            <Tooltip className={styles.tooltip} label={formattedData} placement='top'>
                <p className={styles.date}>{timeStampText}</p>
            </Tooltip>

        </div>
    )
}

export default PostHeader;