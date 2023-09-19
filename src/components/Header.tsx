import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    return (

        <div id={styles["HeaderConnecte"]}>

            <div id={styles["HeaderHaut"]}>



                <div id={styles["LogoSite"]}>
                    {/* IMG LOGO Site */}
                    <Link to={'/'}>
                        <img src={logo} width="80" height="80" alt="Logo" />
                    </Link>

                </div>

                <div>
                    {/* Lien page Forum */}
                    <Link to={'/forum'} className='link'>
                        <h3>Forum</h3>
                    </Link>
                </div>

                <div>
                    {/* Lien page Blogue */}
                    <Link to={'/blogue'} className='link'>
                        <h3>Blogue</h3>
                    </Link>
                </div>

                <div>
                    {/* Lien page Liste des projets */}
                    <Link to={'/projets'} className='link'>
                        <h3>Projets</h3>
                    </Link>
                </div>

                <div>
                    {/* Lien page Offres d'emploi */}
                    <Link to={'/projets'} className='link'>
                        <h3>Offres d'emploi</h3>
                    </Link>
                </div>

                <div>
                    {/* Lien page Offres d'emploi */}
                    <Link to={'/projets'} className='link'>
                        <h3>Messages</h3>
                    </Link>
                </div>


                <div id={styles["IconeUtilisateur"]}>
                    {/* IMG Icône Utilisateur */}
                    <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/connexion')} />
                </div>
            </div>

            


        </div>



    );
}

export default Header;