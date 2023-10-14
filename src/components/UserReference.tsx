import styles from '../styles/UserReference.module.css'
import {Link} from "react-router-dom";

interface UserReferenceProps {
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}

function UserReference(props: UserReferenceProps) {
    return (
        <div className={styles.container}>

            <Link to={`/u/${props.nomUtilisateur}`}>
                <img className={styles.image_profil} src={props.urlImageProfil} alt={props.nomAffichage}/>
            </Link>


            <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                <p className={styles.display_name}>{props.nomAffichage}</p>
                <p className={styles.username}>@{props.nomUtilisateur}</p>
            </Link>
        </div>
    )
}

export default UserReference;