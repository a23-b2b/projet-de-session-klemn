import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Landing.module.css'

function Landing() {
    return (
        <>
            <div className={styles.flexbox}>
                <LoginForm />
            </div>
        </>
    );
}

export default Landing;
