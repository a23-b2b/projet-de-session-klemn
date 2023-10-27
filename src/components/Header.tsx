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
                        <img src={logo} width="63" height="63" alt="Logo" />
                    </Link>

                </div>

                {/* <div>
                    Lien page Forum
                    <Link to={'/'} className='link'>
                        <h3>Accueil</h3>
                    </Link>
                </div> */}

                <div id={styles["IconeUtilisateur"]}>
                    {/* IMG Icône Utilisateur */}
                    <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/authenticate')} />
                </div>
            </div>
        </div>










    );
}

export default Header;