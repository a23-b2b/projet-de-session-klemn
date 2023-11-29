import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/HelloWorld.module.css'
import { useEffect } from 'react';

function HelloWorld() {

    /*Set Theme on Refresh*/
    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");
     
    function changeTheme(hue: number, saturation: number) {
        document.documentElement.style.setProperty('--base_h', hue.toString())
        document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }

    useEffect(() => {
        changeTheme(hueLS, saturationLS);
      }, []);

    return (
        <div>
            <h1 className={styles.h1}>Hello world!</h1>
            <HelloWorldComponent/>
            <Bonjour prenom={'Bob'} />
            <Bonjour prenom='mon prenom!!' />
        </div>
    );
}

export default HelloWorld;
