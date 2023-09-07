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
                <div>
                    <LoginForm />
                    <p onClick={() => setFormIsLogin(false)}>Vous n'avez pas de compte? Inscrivez vous maintenant!</p>
                </div>
            )
        }

        return (
            <div>
                <RegisterForm />
                <p onClick={() => setFormIsLogin(true)}>Vous êtes déjà inscrit? Connectez vous maintenant!</p>
            </div>
        )
    }

    return (
        <>
            <div className={styles.flexbox} id={styles["ConteneurLanding"]}>
                <div className={styles.flex_child}>
                    <LoginOrRegister />
                </div>
                <div className={styles.flex_child}>
                    <h2>Contenu a droite ici!!</h2>
                    <p style={{maxWidth: "600px"}}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Et accusamus quod aperiam minima vitae fuga nobis perspiciatis 
                        illo consequuntur aut alias nulla vero eveniet ratione sapiente, 
                        libero dolor, officia perferendis.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Landing;
