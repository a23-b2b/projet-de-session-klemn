import { useEffect, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion } from "framer-motion";
import VoteWidget from '../../components/Post/voteWidget';
import { Menu, MenuItem } from '@szhsin/react-menu';
import Select, { StylesConfig } from 'react-select';
import { HslStringColorPicker } from "react-colorful";

const options = [
    { value: 'shake_slide', label: 'Shake + slide' },
    { value: 'shake_fade', label: 'Shake + fade' },
    { value: 'same_slide', label: 'Same + slide' },
    { value: 'same_fade', label: 'Same + fade' },
];



function Interface() {
    const [voteAnimationType, setVoteAnimationType] = useState("");
    const [voteClickAnimation, setVoteClickAnimation] = useState("");
    const [voteTextAnimation, setVoteTextAnimation] = useState("");


    function changeLikeAnimationSetting(type: string) {
        switch (type) {
            case "shake_slide":
                setVoteAnimationType("shake_slide")
                localStorage.setItem("voteClickAnimation", "shake");
                localStorage.setItem("voteTextAnimation", "slide");
                break;

            case "shake_fade":
                setVoteAnimationType("shake_fade")
                localStorage.setItem("voteClickAnimation", "shake");
                localStorage.setItem("voteTextAnimation", "fade");
                break;

            case "same_slide":
                setVoteAnimationType("same_slide")
                localStorage.setItem("voteClickAnimation", "same");
                localStorage.setItem("voteTextAnimation", "slide");
                break;

            case "same_fade":
                setVoteAnimationType("same_fade")
                localStorage.setItem("voteClickAnimation", "same");
                localStorage.setItem("voteTextAnimation", "fade");
                break;

            // case "fade_fade":
            //     setVoteAnimationType("fade_fade");
            //     localStorage.setItem("voteAnimationType", "fade_fade");
            //     break;

            // case "none":
            //     setVoteClickAnimation("shake")
            //     setVoteTextAnimation("slide")
            //     localStorage.setItem("voteClickAnimation", "shake");
            //     localStorage.setItem("voteTextAnimation", "slide");
            //     break;

            default:
                setVoteClickAnimation("shake")
                setVoteTextAnimation("slide")
                localStorage.setItem("voteClickAnimation", "shake");
                localStorage.setItem("voteTextAnimation", "slide");
                break;
        }
    }

    useEffect(() => {
        if (localStorage.getItem("voteAnimationType")) {
            setVoteAnimationType(localStorage.getItem("voteAnimationType") || "shake_slide")
        }
    }, [])




    const [selectedOption, setSelectedOption] = useState(0);



    /*Hue/Saturation */

    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");

    //let colorThemeLS = window.localStorage.getItem('colorTheme') || "";

    const [hue, setHue] = useState(hueLS || 270);
    const [saturation, setSaturation] = useState(saturationLS || 30);

    //const [colorTheme] = useState(colorThemeLS || "hsl(270, 30%, 50%)");


    function changeTheme(hue: number, saturation: number) {
       document.documentElement.style.setProperty('--base_h', hue.toString())
       document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }


    useEffect(() => {
        if (typeof (Storage) !== "undefined") {
            // Local storage is available
            window.localStorage.setItem('hue', JSON.stringify(hue));
            window.localStorage.setItem('saturation', JSON.stringify(saturation));
            //window.localStorage.setItem('colorTheme', JSON.stringify(colorTheme));
        } else {
            // Local storage is not supported
            console.error("Local storage is not supported in this browser.");

        }

        //changeTheme(hueLS, saturationLS)
    }, [hue || saturation ])

    useEffect(() => {
        if (localStorage.getItem("hue") === null || localStorage.getItem("saturation") === null) {
            window.localStorage.setItem('hue', JSON.stringify(270));
            window.localStorage.setItem('saturation', JSON.stringify(30));

            //window.localStorage.setItem('colorTheme', JSON.stringify("hsl(270, 30%, 50%)"));
            
        }
    }, []);



    return (
        <div className={styles.container_parametres}>
            <motion.div initial={{ x: "-15%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h1 className={'global_title'} id={styles["titleParametres"]}>Interface</h1>

                <h3 className={'global_subtitle'}>Animations</h3>

                <div className={styles.form}>
                    <div className={styles.containerDiv}>
                        <div>
                            <label className={'global_label'} >Animation d'interraction avec une publication (like, dislike)</label>

                        </div>

                        {/*
                        <Select
                            defaultValue={selectedOption}
                            onChange={e => changeLikeAnimationSetting("sss")}
                            options={options}
                        />
                        
                        */}


                        <select className={styles.selectInterface} value={voteAnimationType} onChange={e => changeLikeAnimationSetting(e.target.value)}>
                            <option value="shake_slide">Shake + slide</option>
                            <option value="shake_fade">Shake + fade</option>
                            <option value="same_slide">Same + slide</option>
                            <option value="same_fade">Same + fade</option>
                        </select>
                    </div>


                    <div className={styles.exemple_animation} style={{ maxWidth: '100px' }}>
                        <VoteWidget idPost={'0'} nombreLike={0} nombreDislike={0} userVote={0} />
                    </div>

                </div>
                <br />

                <hr className={styles.hr}></hr>

                <h3 className={'global_subtitle'}>Thème du site</h3>

                <div>

                    <div id={styles["descriptionsTheme"]}>
                        <p>Glisser le slider pour changer la couleur!</p>
                    </div>

                    <div className={styles.conteneurCouleur} id={styles["descriptionsTheme"]}>
                        <p>NOUVELLE COULEUR!</p>
                    </div>

                    <input className={styles.slider}
                        type="range"
                        min="0"
                        max="360"
                        value={hue}
                        onChange={(e) => {
                            setHue(parseInt(e.target.value));
                            changeTheme(hue, saturation);
                        }} />

                    <input className={styles.slider}
                        type="range"
                        min="0"
                        max="100"
                        value={saturation}
                        onChange={(e) => {
                            setSaturation(parseInt(e.target.value));
                            changeTheme(hue, saturation);
                        }} />

                    
                   


                </div>







            </motion.div>
        </div>
    );


}

export default Interface;