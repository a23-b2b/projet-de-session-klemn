import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import logo from '../images/logo-klemn.svg';
import { Link, useNavigate } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { LuMenu, LuSettings } from 'react-icons/lu';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { auth } from '../../src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import Logo from './Logo';


function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUsername();
  }, []);

  async function getUsername() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          fetch(`${process.env.REACT_APP_API_URL}/username/${user.uid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': idToken
            },
          }).then(response => response.json()).then(response => {

            setUsername(response[0].nom_utilisateur)
          }).catch((error) => {
            toast.error(`Une erreur est survenue: ${error}`)
          })
        })
      }
    })
  }

  return (
    <div id={styles["Conteneur_Header"]}>

      <div id={styles["Conteneur_Interieur_Header"]}>

        <div id={styles["LogoSite"]}>
          <Link to={'/'}>
            {/* <img src={logo} width="80" height="80" alt="Logo" /> */}
            <Logo/>
          </Link>
        </div>

        <div>
          <Menu
            transition={true}
            menuClassName={styles.dropdown_menu}
            menuButton={
              <div className={styles.dropdown}>
                <LuMenu size="40px" id={styles["icone_list"]} />
              </div>
            }>

            <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate(`/u/${username}`)}>
              <CgProfile className={styles.dropdown_menu_item_icon}/>
              <span id={styles["link"]}>
                Profil
              </span>
            </MenuItem>

            <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/parametres/profil')}>
              <LuSettings className={styles.dropdown_menu_item_icon}/>
              <span id={styles["link"]}>
                Paramètres
              </span>
            </MenuItem>

            <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/gestion')}>
              <RiTeamLine className={styles.dropdown_menu_item_icon}/>
              <span id={styles["link"]} >
                Collaboration
              </span>
            </MenuItem>

            <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/authenticate')}>
              <RiLogoutCircleRLine className={styles.dropdown_menu_item_icon}/>
              <span id={styles["link"]}>
                Déconnexion
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>

  );
}

export default Header;
