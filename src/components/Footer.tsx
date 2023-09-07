import styles from '../styles/Footer.module.css';
import logo from '../images/logo.png';
import github from '../images/github.png';
import google from '../images/google.png';



function Footer() {
    return (


        <div id={styles["ConteneurFooter"]}>
            <div id={styles["Footer"]}>
                {/* Footer */}

                <div id={styles["FooterHaut"]}>
                    {/* Footer section haut*/}
                    <div id={styles["SectionGauche"]}>
                        {/* Section Gauche */}
                        <div id={styles["TitreNomSite"]}>
                            {/* Nom site */}
                            <h1>KLEMN</h1>
                        </div>

                        <div>
                            {/* Description */}
                            <div id={styles["TitreSection"]}>
                                <h2>Titre section</h2>
                            </div>
                            <div id={styles["DescriptionSection"]}>
                                <h3>Description de description de description de description de description de description
                                    de description de description de description de description.
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div id={styles["SectionDroite"]}>
                        {/* Section Droite */}

                        <div>
                            {/* Col 1 */}
                            <div>
                                {/* Titre col 1 */}
                                <h2>Produits</h2>
                            </div>
                            <div>
                                {/* Éléments col 1 */}
                                <div>
                                    <h3>À propos</h3>
                                </div>

                                <div>
                                    <h3>Resources</h3>
                                </div>

                                <div>
                                    <h3>Projet</h3>
                                </div>

                                <div>
                                    <h3>Entreprise</h3>
                                </div>
                            </div>

                        </div>

                        <div>
                            {/* Col 2 */}

                            <div>
                                {/* Titre col 2 */}
                                <h2>Produits</h2>
                            </div>
                            <div>
                                {/* Éléments col 2 */}
                                <div>
                                    <h3>À propos</h3>
                                </div>

                                <div>
                                    <h3>Resources</h3>
                                </div>

                                <div>
                                    <h3>Projet</h3>
                                </div>

                                <div>
                                    <h3>Entreprise</h3>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Col 3 */}

                            <div>
                                {/* Titre col 3 */}
                                <h2>Produits</h2>
                            </div>
                            <div>
                                {/* Éléments col 3 */}
                                <div>
                                    <h3>À propos</h3>
                                </div>

                                <div>
                                    <h3>Resources</h3>
                                </div>

                                <div>
                                    <h3>Projet</h3>
                                </div>

                                <div>
                                    <h3>Entreprise</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id={styles["FooterBas"]}>
                    {/* Footer section bas*/}

                    <div id={styles["FooterBas"]}>
                        {/* Section liens*/}

                        <div id={styles["NomSite"]}>
                            <h2>@2023 KLEMN, Inc.</h2>
                        </div>
                        <div id={styles["NomsSections"]}>
                            <div>
                                <h3>Termes d'utilisation</h3>
                            </div>

                            <div>
                                <h3>Confidentialité et sécurité</h3>
                            </div>

                            <div>
                                <h3>Qu'est-ce que KLEMN ?</h3>
                            </div>
                        </div>


                    </div>

                    <div id={styles["SectionIcones"]}>
                        {/* Section icônes*/}

                        <div>
                            {/* Icône 1*/}
                            <img src={github} width="40" height="40" alt="User" onClick={() => window.location.replace('https://github.com/')} />

                        </div>

                        <div>
                            {/* Icône 2*/}
                            <img src={google} width="40" height="40" alt="User" onClick={() => window.location.replace('https://google.com/')} />
                        </div>

                    </div>
                </div>


            </div>

        </div>




    );
}

export default Footer;