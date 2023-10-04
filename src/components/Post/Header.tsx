import { Link } from 'react-router-dom';
import styles from '../../styles/Post.module.css';
import {format, parseISO } from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import { fr } from 'date-fns/locale';

interface HeaderProps {
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}


const PostHeader = (props: HeaderProps) => {
    
    const date_post = format(parseISO(props.date), 'PPP', { locale: fr })
    const heure_post = format(parseISO(props.date), 'HH:mm')

    //const heure_post = utcToZonedTime(parseISO(props.date), 'America/Montreal').toString()
   
    console.log(props.urlImageProfil)
    return (
        <div className={styles.header}>

            <div className={styles.header_content}>

                <Link to={`/u/${props.nomUtilisateur}`} >
                    <img className={styles.image_profil} src={props.urlImageProfil} />
                </Link>

            </div>
            <div id={styles["header_conteneur_droit"]} className={'global_header_post'}>
                <div id={styles["inner_droit_nom_utilisateur"]}>
                    <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                        <p className={styles.display_name}>{props.nomAffichage}</p>
                        <p className={styles.username}>@{props.nomUtilisateur}</p>
                    </Link>
                </div>
                <div id={styles["inner_droit_date"]}>
                    <p id={styles["date"]} > {date_post}, {heure_post}</p>

                </div>
                
            </div>

        </div>
    )
}

export default PostHeader;