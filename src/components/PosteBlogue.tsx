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
                    <h3 className={styles.nom}>Nom Prénom</h3>
                    <h4 className={styles.nomUtilisateur}>@NomUtilisateur123</h4>
                </div>


            </div>

            <div id={styles["SectionBas"]}>
                {/* Section Bas */}

                <div>
                    {/* Titre du post*/}
                    <h2 className={styles.titre}>Titre du post Blogue!</h2>
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

export default PosteBlogue;