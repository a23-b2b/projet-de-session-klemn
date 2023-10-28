import { useEffect, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion } from "framer-motion";
import VoteWidget from '../../components/Post/voteWidget';
import { Menu, MenuItem } from '@szhsin/react-menu';

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



    return (
        <div className={styles.container_parametres}>
            <motion.div initial={{ x: "-15%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h1 className={'global_title'} id={styles["titleParametres"]}>Interface</h1>

                <h3 className={'global_subtitle'}>Animations</h3>

                <div className={styles.form}>
                    <div className={styles.containerDiv}>
                        <div>
                            <label className={'global_input_field_label'} >Animation d'interraction avec une publication (like, dislike)</label>

                        </div>
                    </div>

                    <div className={styles.dropdownDiv}>

                        {/*
                        <select className={styles.selectInterface} value={voteAnimationType} onChange={e => changeLikeAnimationSetting(e.target.value)}>
                            <option value="shake_slide">Shake + slide</option>
                            <option value="shake_fade">Shake + fade</option>
                            <option value="same_slide">Same + slide</option>
                            <option value="same_fade">Same + fade</option>
                        </select>
                        
                        */}

                        {/* <option value="fade_fade">Fade only</option> */}
                        {/* <option value="none">None</option> */}


                        <Menu menuButton={
                            <div className={styles.dropdown_menu_bouton}> {voteAnimationType}</div>
                        }

                            transition={true}
                            menuClassName={styles.dropdown_menu}
                            onItemClick={e => changeLikeAnimationSetting(e.value)}>

                            <MenuItem value={'shake_slide'} className={styles.dropdown_menu_item}><span>Shake + slide</span></MenuItem>
                            <MenuItem value={'shake_fade'} className={styles.dropdown_menu_item}><span>Shake + fade</span></MenuItem>
                            <MenuItem value={'same_slide'} className={styles.dropdown_menu_item}><span>Same + slide</span></MenuItem>
                            <MenuItem value={'same_fade'} className={styles.dropdown_menu_item}><span>Same + fade</span></MenuItem>

                        </Menu>

                        <div className={styles.exemple_animation} style={{ maxWidth: '100px' }}>
                            <VoteWidget idPost={'0'} nombreLike={0} nombreDislike={0} userVote={0} />
                        </div>
                    </div>
                </div>
                <br />
            </motion.div>
        </div>
    );
}

export default Interface;