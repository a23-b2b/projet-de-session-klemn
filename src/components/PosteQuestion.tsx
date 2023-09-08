import user from '../images/user.png';
import styles from '../styles/Post.module.css'

function PosteQuestion() {
    return (
        <div id={styles["ConteneurPost"]}>
            {/* Post Blogue */}
            <div id={styles["SectionInfo"]}>
                {/* Section Info */}
                <div>
                    {/* Date du post*/}
                    <p className={styles.date}>25 mins</p>
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
                    <h3 className={styles.nom}>Nom Prénom</h3>
                    <h4 className={styles.nomUtilisateur}>@NomUtilisateur123</h4>
                </div>


            </div>

            <div id={styles["SectionBas"]}>
                {/* Section Bas */}

                <div id={styles["TitreQuestion"]}>
                    {/* Titre du post*/}

                    <div>
                        <h2 className={styles.titre}>Titre de la question!</h2>
                    </div>
                    <div>
                        <p className={styles.question}>✓ Résolu!</p>
                    </div>
                </div>

                <div>
                    {/* Description du post*/}
                    <p className={styles.description}>
                        Nam quis neque maximus lorem venenatis interdum sit amet sed est.
                        Vivamus volutpat augue ligula, maximus ornare dui condimentum eu.
                        Proin sed venenatis justo. Nullam non enim velit.
                        Nunc semper nisl tincidunt, euismod leo quis, molestie magna.
                        Vivamus condimentum scelerisque tellus ut egestas.
                        Proin consequat sapien vel auctor auctor. Nulla id euismod augue.</p>
                </div>

            </div>
        </div>
    );
}

export default PosteQuestion;