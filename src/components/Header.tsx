import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiCircleList } from 'react-icons/ci';
import { LuFileQuestion } from 'react-icons/lu';
import { RxFileText } from 'react-icons/rx';
import { RiTeamLine } from 'react-icons/ri';
import { Menu, MenuButton, MenuDivider, MenuHeader, MenuItem } from '@szhsin/react-menu';

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

                {/* <div>
                    Lien page Forum
                    <Link to={'/'} className='link'>
                        <h3>Accueil</h3>
                    </Link>
                </div> */}

                <div id={styles["SectionDroite"]}>
                    <div id={styles["IconeUtilisateur"]}>
                        {/* IMG Icône Utilisateur */}
                        <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/authenticate')} />
                    </div>

                    <div className={styles.dropdown}>

                        <Menu menuButton={
                            <div className={styles.dropdown}>
                                <CiCircleList size="40px" className={styles.icone_list} />
                            </div>
                        }

                            transition={true}
                            menuClassName={styles.dropdown_menu}
                        >

                            <MenuItem className={styles.dropdown_menu_item}>
                            <RxFileText className={styles.dropdown_menu_icon} />
                                <Link to={'/'} id={styles["link"]}  className={'link'}>
                                    Blogues
                                </Link>
                            </MenuItem>
                            <MenuItem className={styles.dropdown_menu_item}>
                            <LuFileQuestion className={styles.dropdown_menu_icon} />
                                <Link to={'/'} id={styles["link"]} className={'link'}>
                                    Question
                                </Link>
                            </MenuItem>
                            <MenuItem className={styles.dropdown_menu_item}>
                            <RiTeamLine className={styles.dropdown_menu_icon} />
                                <Link to={'/'} id={styles["link"]} className={'link'}>
                                    Collaboration
                                </Link>
                            </MenuItem>
                        </Menu>

                    </div>
                </div>
            </div>
        </div>










    );
}

export default Header;