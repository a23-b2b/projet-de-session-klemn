import styles from '../styles/Accueil.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import Connexion from '../pages/Connexion';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    return (
        <div>

            {/* les images de HEADER*/}
            <div>
                <img src={logo} alt="Logo" onClick={() => navigate('/')} />
            </div>
            <div>
                <img src={user} alt="User" onClick={() => navigate('/connexion')} />
            </div>


            {/* le texte du header */}
            <div>

                <div>
                    <h1 onClick={() => navigate('/projets')}>Projets</h1>
                </div>
                <div>
                    <h1 onClick={() => navigate('/forum')}>Forum</h1>
                </div>
                <div>
                    <h1>Blogue</h1>
                </div>
                <div>
                    {/*barre de recherche */}
                    <div>
                        <input type='text' id='searchBar'></input>
                    </div>
                    <div>
                        <img src={search} alt="searchLoop" /*onClick={}*/ />
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Header;