import { Link } from 'react-router-dom';
import user from '../images/user.png';
import styles from '../styles/Post.module.css'

export interface QuestionProp {
    idPost: string;
    date: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    type: string;
    status: boolean;
    meilleureReponse: number;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number; 
    nombrePartage: number;
    nombreCommentaire: number;
}


function PosteQuestion(props: QuestionProp) {
    return (
        <div id={styles["ConteneurPost"]}>
            {/* Post Blogue */}
            <div id={styles["SectionInfo"]}>
                {/* Section Info */}
                <div>
                    {/* Date du post*/}
                    <p className={styles.date}>{props.date}</p>
                </div>

                <div>
                    {/* Autre fonctionnalitées */}
                    <p className={styles.autre}>⋮</p>
                </div>

            </div>
            <div id={styles["SectionHaut"]}>
                {/* Section Haut */}
                <Link to={`/p/${props.idCompte}`}>
                    <div>
                        {/* Icone Utilisateur */}
                        <img src={user} width="40" height="40" alt="User" />
                    </div>
                </Link>

                <div>
                    {/* Nom Utilisateur et @*/}
                    <h3 className={styles.nom}>{props.prenom} {props.nom}</h3>
                    <h4 className={styles.nomUtilisateur}>@{props.nomUtilisateur}</h4>
                </div>


            </div>

            <div id={styles["SectionBas"]}>
                {/* Section Bas */}

                <div id={styles["TitreQuestion"]}>
                    {/* Titre du post*/}
                    <Link to={`/p/${props.idPost}`}>
                        <div>
                            <h2 className={styles.titre}>{props.titre}</h2>
                        </div>
                    </Link>
                    <div>
                        <p className={styles.question}>Résolu: {props.status}</p>
                    </div>
                </div>

                <div>
                    {/* Description du post*/}
                    <p className={styles.description}>
                        {props.contenu}</p>
                </div>

                {props.meilleureReponse && (
                    <div>
                        {/* Meilleur reponse */}
                            <p className={styles.meilleureReponse}>
                                {props.meilleureReponse}
                            </p>
                    </div>
                )}

                {!props.meilleureReponse && (
                    <div>
                        {/* Pas de reponse */}
        
                            <p className={styles.meilleureReponse}>
                                pas de reponse
                            </p>
                    </div>
                )}


            </div>
        </div>
    );
}

export default PosteQuestion;