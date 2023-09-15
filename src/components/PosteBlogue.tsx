import { Link } from 'react-router-dom';
import user from '../images/user.png';
import styles from '../styles/Post.module.css'

export interface BlogueProp {
    idPost: number;
    date: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    type: string;
    idCompte: string; 
    nombreLike: number;
    nombreDislike: number; 
    nombrePartage: number;
    nombreCommentaire: number;
}

function PosteBlogue(props: BlogueProp) {
    return (
        <div id={styles["ConteneurPost"]}>
            {/* Post Blogue */}
            <div id={styles["SectionInfo"]}>
                {/* Section Info */}
                <div>
                    {/* Date du post*/}
                    <p className={styles.date}>{ props.date }</p>
                </div>

                <div>
                    {/* Autre fonctionnalitées */}
                    <p className={styles.autre}>⋮</p>
                </div>

            </div>
            <div id={styles["SectionHaut"]}>
                {/* Section Haut */}

                <div>
                    {/* Icone Utilisateur */}
                    <img src={user} width="40" height="40" alt="User" />
                </div>

                <div>
                    {/* Nom Utilisateur et @*/}
                    <a href={ "http://localhost:1111/u/" + props.nomUtilisateur }>
                        <h3 className={styles.nom}>{props.prenom} {props.nom}</h3>
                        <h4 className={styles.nomUtilisateur}>@{props.nomUtilisateur}</h4>
                    </a>
                </div>


            </div>

            <div id={styles["SectionBas"]}>
                {/* Section Bas */}

                <div>
                    {/* Titre du post*/}
                    {/* <a href={ "http://localhost:1111/p/" + props.idPost.toString() }>
                        <h2 className={styles.titre}>{props.titre}</h2>
                    </a> */}
                    <Link to={`/p/${props.idCompte}`}>
                        <h2 className={styles.titre}>{props.titre}</h2>
                    </Link>
                </div>

                <div>
                    {/* Description du post*/}
                    <p className={styles.description}>
                        {props.contenu}</p>
                </div>

            </div>
        </div>
    );
}

export default PosteBlogue;