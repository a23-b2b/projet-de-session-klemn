import styles from '../styles/Header.module.css';
import logo from '../images/logo.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { CiCircleList } from 'react-icons/ci';
import { AnimatePresence, motion, useAnimate, useTransform, useMotionValue } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const x = useMotionValue(0)
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
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

                    <div id={styles["IconeUtilisateur"]}>
                        {/* IMG Icône Utilisateur */}
                        <img src={user} width="40" height="40" alt="User" onClick={() => navigate('/authenticate')} />

                    </div>

                    <div className={styles.dropdown}>
                        <button className={styles.dropbtn}>
                            <CiCircleList size="40px" className={styles.icone_list} />
                        </button>

                        <motion.div className={styles.dropdown_content}

                            initial={{ scale: 0 }}
                            animate={{
                                x: -100,
                                y: 0,
                                scale: 1,
                                rotate: 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}>
                            <Link to={'/'}>
                                <p>Blogues</p>
                            </Link>
                            <Link to={'/'}>
                                <p>Questions</p>
                            </Link>
                            <Link to={'/'}>
                                <p>Projets</p>
                            </Link>
                            <Link to={'/'}>
                                <p>Paramètres</p>
                            </Link>
                            <Link to={'/'}>
                                <p>Compte</p>
                            </Link>
                            <Link to={'/'}>
                                <p>KLEMN</p>
                            </Link>

                        </motion.div>
                    </div>
                </div>





            </div>

        </div>




    );
}

export default Header;