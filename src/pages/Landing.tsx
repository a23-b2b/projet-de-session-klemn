import { useState } from 'react';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Landing.module.css'
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';

function Landing() {
    const [formIsLogin, setFormIsLogin] = useState(true);

    return (

        <div className={styles.flexbox} id={styles["ConteneurLanding"]}>
            <div className={styles.flex_child}>

                {formIsLogin && (
                    <div>
                        <LoginForm />
                        <div id={styles["Paragraphe"]}>
                            <div>
                                <p id={styles["P1"]}>Vous n'avez pas de compte?</p>
                            </div>
                            <div>
                                <p id={styles["P2"]} onClick={() => setFormIsLogin(false)}>Inscrivez vous maintenant!</p>

                            </div>
                        </div>
                    </div>

                )}

                {!formIsLogin && (
                    <div>
                        <RegisterForm />
                        <div id={styles["Paragraphe"]}>
                            <div>
                                <p id={styles["P1"]}>Vous êtes déjà inscrit?</p></div>
                            <div>
                                <p id={styles["P2"]} onClick={() => setFormIsLogin(true)}>Connectez vous maintenant!</p>

                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className={styles.flex_child} id={styles["ConteneurContenu"]} >
                <h2>Contenu a droite ici!!</h2>
                <p style={{ maxWidth: "600px" }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Et accusamus quod aperiam minima vitae fuga nobis perspiciatis
                    illo consequuntur aut alias nulla vero eveniet ratione sapiente,
                    libero dolor, officia perferendis.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Et accusamus quod aperiam minima vitae fuga nobis perspiciatis
                    illo consequuntur aut alias nulla vero eveniet ratione sapiente,
                    libero dolor, officia perferendis.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Et accusamus quod aperiam minima vitae fuga nobis perspiciatis
                    illo consequuntur aut alias nulla vero eveniet ratione sapiente,
                    libero dolor, officia perferendis.
                </p>
            </div>
        </div>

    );
}

export default Landing;
