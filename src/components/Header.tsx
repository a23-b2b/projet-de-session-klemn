import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiCircleList } from 'react-icons/ci';
import { RiTeamLine } from 'react-icons/ri';
import { LuSettings } from 'react-icons/lu';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { AiFillGithub } from 'react-icons/ai';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { auth } from '../../src/firebase';
import { onAuthStateChanged, unlink } from 'firebase/auth';
import toast from 'react-hot-toast';
import { GithubAuthProvider, getAuth, linkWithPopup, getAdditionalUserInfo } from 'firebase/auth'

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [githubLinked, setGithubLinked] = useState(false)

  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
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
            if (response[0].id_github == null) {
              setGithubLinked(false)
            } else {
              setGithubLinked(true)
            }

          }).catch((error) => {
            toast.error(`Une erreur est survenue: ${error}`)
          })
        })
      }
    })
  }


  async function lierCompteGithub() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken(/* forceRefresh */ true).then((idToken) => {
          linkWithPopup(user, githubProvider).then((result) => {
            toast("Compter lier avec success")
            setGithubLinked(true)
            const credential = GithubAuthProvider.credentialFromResult(result);
            const user = result.user;
            const additionalInfo = getAdditionalUserInfo(result)!
            if (additionalInfo) {
              if (additionalInfo.profile) {
                const profile = additionalInfo.profile
                fetch(`${process.env.REACT_APP_API_URL}/user/sync-github`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                  },
                  body: JSON.stringify({
                    id_github: typeof (profile.id) == 'number' ? profile.id.toString() : undefined,
                  })

                })

              }
            }


          }).catch((error) => {
            console.log(JSON.stringify(error))
            toast.error(error)
          });
        })
      }
    })

  }

  async function dissocierCompteGithub() {
    /*const auth = getAuth();
    unlink(auth.currentUser!, auth.currentUser?.providerId!).then(() => {
      toast.success("Votre compte a été dissocié avec sussès!")
    }).catch((error) => {
      toast.error(error)
      console.log(JSON.stringify(error))
    });
    */

  }

  return (
    <div id={styles["HeaderConnecte"]}>
      <div id={styles["HeaderHaut"]}>
        <div id={styles["LogoSite"]}>
          <Link to={'/'}>
            <img src={logo} width="80" height="80" alt="Logo" />
          </Link>
        </div>
        <div id={styles["SectionDroite"]}>
          <div className={styles.dropdown}>
            <Menu
              transition={true}
              menuClassName={styles.dropdown_menu}
              menuButton={
                <div className={styles.dropdown}>
                  <CiCircleList size="40px" className={styles.icone_list} />
                </div>
              }
            >
              <Link to={`/u/${username}`} id={styles["linkConteneur"]}>
                <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate(`/u/${username}`)}>
                  <CgProfile id={styles["linkConteneur"]} className={styles.dropdown_menu_icon} />
                  <span id={styles["link"]} className={'link'}>
                    Profil
                  </span>
                </MenuItem>
              </Link>
              <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/parametres/profil')}>
                <LuSettings className={styles.dropdown_menu_icon} />
                <span id={styles["link"]} className={'link'}>
                  Paramètres
                </span>
              </MenuItem>
              <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/gestion')}>
                <RiTeamLine className={styles.dropdown_menu_icon} />
                <span id={styles["link"]} className={'link'}>
                  Collaboration
                </span>
              </MenuItem>
              <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/authenticate')}>
                <RiLogoutCircleRLine className={styles.dropdown_menu_icon} />
                <span id={styles["link"]} className={'link'}>
                  Déconnexion
                </span>
              </MenuItem>
              {!githubLinked ?
                <MenuItem className={styles.dropdown_menu_item} onClick={() => lierCompteGithub()}>
                  <AiFillGithub className={styles.dropdown_menu_icon} />
                  <span id={styles["link"]} className={'link'}>
                    Lier Compte GitHub
                  </span>
                </MenuItem>
                :
                <MenuItem className={styles.dropdown_menu_item} onClick={() => dissocierCompteGithub()}>
                  <AiFillGithub className={styles.dropdown_menu_icon} />
                  <span id={styles["link"]} className={'link'}>
                    Dissocier Compte GitHub
                  </span>
                </MenuItem>}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
