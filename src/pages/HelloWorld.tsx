import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/HelloWorld.module.css'

function HelloWorld() {
    return (
        <div>
            <h1 className={styles.h1}>Hello world!</h1>
            <HelloWorldComponent/>
        </div>
    );
}

export default HelloWorld;
