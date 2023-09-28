import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import VoteWidget from '../../components/Post/voteWidget';

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
        <motion.div className={styles.container} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1>Interface</h1>

            <h3>Animations</h3>

            <div className={styles.form}>
                <label className={'global_input_field_label'}>Animation d'interraction avec une publication (like, dislike)</label>

                <select value={voteAnimationType} onChange={e => changeLikeAnimationSetting(e.target.value)}>
                    <option value="shake_slide">Shake + slide</option>
                    <option value="shake_fade">Shake + fade</option>
                    <option value="same_slide">Same + slide</option>
                    <option value="same_fade">Same + fade</option>
                    {/* <option value="fade_fade">Fade only</option> */}
                    {/* <option value="none">None</option> */}
                </select>

                <div style={{maxWidth: '100px'}}>
                    <VoteWidget idPost={'0'} nombreLike={0} nombreDislike={0} userVote={0} />
                </div>
            </div>
            <br />
        </motion.div>
    );
}

export default Interface;