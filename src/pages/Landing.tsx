import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Landing.module.css'
import RegisterForm from '../components/RegisterForm';
import { Client } from '@passwordlessdev/passwordless-client';


function Landing() {
    const [formIsLogin, setFormIsLogin] = useState(true);

    return (

        <div className={styles.flexbox}>
            <div className={styles.flex_child}>

                {formIsLogin && (
                    <div >
                        <div>
                            <LoginForm />
                        </div>

                        <div className={styles.conteneur_Texte}>
                            <div>
                                <p>Vous n'avez pas de compte?</p>
                            </div>
                            <div>
                                <p className={'global_text_accent'} id={styles["text_accent"]}  onClick={() => setFormIsLogin(false)}>Inscrivez vous maintenant!</p>

                            </div>
                        </div>
                    </div>

                )}

                {!formIsLogin && (
                    <div>
                        <div>
                            <RegisterForm />
                        </div>

                        <div className={styles.conteneur_Texte}>
                            <div>
                                <p>Vous êtes déjà inscrit?</p></div>
                            <div>
                                <p className={'global_text_accent'} id={styles["text_accent"]} onClick={() => setFormIsLogin(true)}>Connectez vous maintenant!</p>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
}

export default Landing;
