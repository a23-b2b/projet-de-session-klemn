import { useState } from 'react';
import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Landing.module.css'
import RegisterForm from '../components/RegisterForm';

function Landing() {
    const [formIsLogin, setFormIsLogin] = useState(true);

    const LoginOrRegister = () => {
        if (formIsLogin) {
            return (
                <div className={styles.label}>
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
            )
        }

        return (
            <div className={styles.label}>
                <RegisterForm />
                <div id={styles["Paragraphe"]}>
                    <div>
                        <p id={styles["P1"]}>Vous êtes déjà inscrit?</p></div>
                    <div>
                        <p id={styles["P2"]} onClick={() => setFormIsLogin(true)}>Connectez vous maintenant!</p>

                    </div>
                </div>
            </div>
        )
    }

    return (
    
            <div className={styles.flexbox} id={styles["ConteneurLanding"]}>
                <div className={styles.flex_child}>
                    <LoginOrRegister />
                </div>
                <div className={styles.flex_child}>
                    <h2>Contenu a droite ici!!</h2>
                    <p style={{ maxWidth: "600px" }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Et accusamus quod aperiam minima vitae fuga nobis perspiciatis
                        illo consequuntur aut alias nulla vero eveniet ratione sapiente,
                        libero dolor, officia perferendis.
                    </p>
                </div>
            </div>
    
    );
}

export default Landing;
