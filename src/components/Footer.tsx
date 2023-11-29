import styles from '../styles/Footer.module.css';
import github from '../images/github.png';
import google from '../images/google.png';
import { Link, useNavigate } from 'react-router-dom';



function Footer() {
    return (


        <div id={styles["ConteneurFooter"]}>
            {/* Footer */}

            <div id={styles["FooterHaut"]}>
                {/* Footer section haut*/}

                <div id={styles["SectionGauche"]}>
                    {/* Section Gauche */}
                    <h1>KLEMN</h1>
                    <div>
                        <h3>
                            Explorez une multitude de possibilités sur KLEMN, 
                            où chaque section est conçue pour enrichir votre expérience. 
                            Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                            Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                             et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                        </h3>

                    </div>
                </div>

               
                   
                    
                    
            </div>

            <div id={styles["FooterBas"]}>
                {/* Footer section bas*/}
       

                <Link to={'/'} className='link' id={styles["TitreFooterBas"]}>
                    <h2>@2023 KLEMN, Inc.</h2>
                </Link>

                <div id={styles["FooterBasElements"]}>

                    <Link to={'/klemn'} className='link'>
                        <h3>Termes d'utilisation</h3>
                    </Link>


                    <Link to={'/klemn'} className='link'>
                        <h3>Confidentialité et sécurité</h3>
                    </Link>


                    <Link to={'/klemn'} className='link'>
                        <h3>Qu'est-ce que KLEMN?</h3>
                    </Link>
                </div>



                <div id={styles["SectionIcones"]}>
                    {/* Section icônes*/}

                    <div>
                        {/* Icône 1*/}
                        <img src={github} className='global_icon' width="30" height="30" alt="User" onClick={() => window.location.replace('https://github.com/')} />
                    </div>

                    <div>
                        {/* Icône 2*/}
                        <img src={google} className='global_icon' width="30" height="30" alt="User" onClick={() => window.location.replace('https://google.com/')} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Footer;