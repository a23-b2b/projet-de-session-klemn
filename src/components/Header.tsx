import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiCircleList } from 'react-icons/ci';
import { LuFileQuestion } from 'react-icons/lu';
import { RxFileText } from 'react-icons/rx';
import { RiTeamLine } from 'react-icons/ri';
import { LuSettings } from 'react-icons/lu';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { Menu, MenuItem } from '@szhsin/react-menu';

interface HeaderProps {
    nomUtilisateur: string;
}


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

                <div id={styles["SectionDroite"]}>
                    {/*
                    <div id={styles["IconeUtilisateur"]}>
                        
                        <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/authenticate')} />
                    </div>
                    */}


                    <div className={styles.dropdown}>

                        <Menu
                            transition={true}
                            menuClassName={styles.dropdown_menu}
                            menuButton={
                                <div className={styles.dropdown}>
                                    <CiCircleList size="40px" className={styles.icone_list} />
                                </div>}>

                            <MenuItem className={styles.dropdown_menu_item} onClick={() => navigate('/u/${props.nomUtilisateur}')}>
                                <CgProfile className={styles.dropdown_menu_icon} />
                                <Link to={'/u/${props.nomUtilisateur}'} id={styles["link"]} className={'link'}>
                                    Profil
                                </Link>
                            </MenuItem>

                            

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
                        </Menu>
                    </div>
                </div>
            </div>
        </div>










    );
}

export default Header;