import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { useNavigate } from 'react-router-dom';

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
                        <img src={logo} width="100" height="100" alt="Logo" onClick={() => navigate('/')} />
                    </div>

                    <div>
                        {/* Lien page Forum */}
                        <h1 onClick={() => navigate('/forum')}>Forum</h1>
                    </div>

                    <div>
                        {/* Lien page Blogue */}
                        <h1 onClick={() => navigate('/blogue')}>Blogue</h1>
                    </div>

                    <div>
                        {/* Lien page Liste des projets */}
                        <h1 onClick={() => navigate('/projets')}>Liste des projets</h1>
                    </div>

                    <div>
                        {/* Lien page Offres d'emploi */}
                        <h1 onClick={() => navigate('/projets')}>Offre d'emploi</h1>
                    </div>

                    <div>
                        {/* Lien page Offres d'emploi */}
                        <h1 onClick={() => navigate('/projets')}>Messages</h1>
                    </div>

            </div>

            <div id={styles["BarreNavigation"]}>
                {/* Barre de navigations */}
                <input type='text' id='searchBar' placeholder="Recherche.."></input>
                {/* <img src={search} width="30" height="30" alt="searchLoop" /> */}
                
            </div>


        </div>



    );
}

export default Header;