import { Link } from 'react-router-dom';
import styles from '../../styles/Post.module.css'

interface HeaderProps {
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}

const PostHeader = (props: HeaderProps) => {

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
                    <p id={styles["date"]} >{props.date}</p>
                </div>
                
            </div>

        </div>
    )
}

export default PostHeader;