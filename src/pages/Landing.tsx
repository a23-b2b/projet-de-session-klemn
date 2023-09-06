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
            <div className={styles.flexbox}>
                <div>
                    <LoginOrRegister />
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default Landing;
