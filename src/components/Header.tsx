import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    return (

        <div id={styles["HeaderConnecte"]}>

            <div id={styles["IconeUtilisateur"]}>
                {/* IMG Icône Utilisateur */}
                <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/connexion')} />
            </div>

            <div id={styles["HeaderSection2"]}>

                <div id={styles["LogoSite"]}>
                    {/* IMG LOGO Site */}
                    <Link to={'/'}>
                        <img src={logo} width="100" height="100" alt="Logo" />
                    </Link>

                </div>

                <div>
                    {/* Lien page Forum */}
                    <Link to={'/forum'} className='link'>
                        <h1>Forum</h1>
                    </Link>
                </div>

                <div>
                    {/* Lien page Blogue */}
                    <Link to={'/blogue'} className='link'>
                        <h1>Blogue</h1>
                    </Link>
                </div>

                <div>
                    {/* Lien page Liste des projets */}
                    <Link to={'/projets'} className='link'>
                        <h1>Projets</h1>
                    </Link>
                </div>

                <div>
                    {/* Lien page Offres d'emploi */}
                    <Link to={'/projets'} className='link'>
                        <h1>Offres d'emploi</h1>
                    </Link>
                </div>

                <div>
                    {/* Lien page Offres d'emploi */}
                    <Link to={'/Chat'} className='link'>
                        <h1>Messages</h1>
                    </Link>
                </div>

            </div>

            <div id={styles.BarreNavigation}>
                {/* Barre de navigations */}
                <input className="global_input_field" type='text' id='searchBar' placeholder="Recherche..."></input>
                {/* <img src={search} width="30" height="30" alt="searchLoop" /> */}

            </div>


        </div>



    );
}

export default Header;