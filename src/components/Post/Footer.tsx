import { BsFillReplyAllFill } from 'react-icons/bs';
import styles from '../../styles/Post.module.css'
import { AiFillDislike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import SectionReponses from '../SectionReponses';
import { useState } from 'react';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';

interface FooterProps {
    idPost: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    isPostFullScreen: Boolean;
    userVote: number;
}

const PostFooter = (props: FooterProps) => {
    const [isReponsesOpen, setIsReponsesOpen] = useState(false);
    const [postScore, setPostScore] = useState(props.nombreLike - props.nombreDislike)
    const [userVote, setUserVote] = useState(props.userVote) // le vote de lutilisateur pour afficher le bouton en couleur ou non
    const [scoreDifference, setScoreDifference] = useState(0)
    const [scopeLike, animateLike] = useAnimate()
    const [scopeDislike, animateDisike] = useAnimate()
    const [scopeNumberScore, animateNumberScore] = useAnimate()

    function handleVote(score: number) {

        if (score > 0) {

            animateLike(scopeLike.current, {
                scale: 1.3,
                y: '-18px',
                rotate: Math.floor(Math.random() * 40) - 20,
            }, { duration: 0.15, ease: "anticipate" })
                .then(() => {
                    animateLike(scopeLike.current, {
                        scale: 1,
                        y: '0px',
                        rotate: 0,
                    }, { duration: 0.3, type: "spring", bounce: 0.6 })
                })
        }

        if (score < 0) {
            animateDisike(scopeDislike.current, {
                scale: 0.7,
                y: '18px',
                rotate: Math.floor(Math.random() * 40) - 20,
            }, { duration: 0.15, ease: "anticipate" }).then(() => {
                animateDisike(scopeDislike.current, {
                    scale: 1,
                    y: '0px',
                    rotate: 0,
                }, { duration: 0.3, type: "spring", bounce: 0.6 })
            })
        }

        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            if (scoreDifference <= 0) {
                animateNumberScore(scopeNumberScore.current, {
                    y: '20px',
                    opacity: 0,
                }, {
                    duration: 0.3
                })
            }

            if (scoreDifference > 0) {
                animateNumberScore(scopeNumberScore.current, {
                    y: '-20px',
                    opacity: 0,
                }, {
                    duration: 0.3
                })
            }

            fetch('http://localhost:1111/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: auth.currentUser?.uid,
                    post_id: props.idPost,
                    score: score,
                    firebase_id_token: idToken
                }),
            }).then(response => response.json())
                .then(response => {
                    // console.log('before', postScore)
                    // console.log('diff', score)
                    // console.log('result:', response['postScoreDifference'] + postScore)
                    setPostScore(response['postScoreDifference'] + postScore)
                    setUserVote(response['currentUserVote'])
                    setScoreDifference(response['postScoreDifference'])
                }).catch((error) => {
                    console.log(error)
                    toast.error('Une erreur est survenue');
                }).then(() => {
                    if (scoreDifference <= 0) {
                        animateNumberScore(scopeNumberScore.current, {
                            y: [-20, 0],
                            opacity: [0, 1],
                        }, {
                            duration: 0.3
                        })
                    }

                    if (scoreDifference > 0) {
                        animateNumberScore(scopeNumberScore.current, {
                            y: [20, 0],
                            opacity: [0, 1],
                        }, {
                            duration: 0.3
                        })
                    }
                })
        })
    }

    return (
        <div>
            <div className={styles.footer}>

                <div className={styles.bouton_interraction} id={styles.bouton_interraction_reply} onClick={() => setIsReponsesOpen(!isReponsesOpen)}>
                    <BsFillReplyAllFill className={styles.icone} id={styles.icone_reply} />
                    <span className={styles.interraction_count}>{props.nombreCommentaire}</span>
                </div>

                <motion.div className={styles.like_dislike_container} layout>
                    <motion.div className={styles.bouton_interraction} id={styles.bouton_interraction_like} onClick={() => handleVote(1)}>
                        <div ref={scopeLike}>
                            <AiFillLike className={`styles.icone ${userVote === 1 && styles.liked_post}`} id={styles.icone_like} />
                        </div>

                    </motion.div>

                    <span ref={scopeNumberScore} className={styles.interraction_count}>{postScore}</span>

                    <motion.div className={styles.bouton_interraction} id={styles.bouton_interraction_dislike} onClick={() => handleVote(-1)}>
                        <div ref={scopeDislike}>
                            <AiFillDislike className={`styles.icone ${userVote === -1 && styles.disliked_post}`} id={styles.icone_dislike} />
                        </div>
                    </motion.div>
                </motion.div>


                <div className={styles.bouton_interraction} id={styles.bouton_interraction_partage}>
                    <AiOutlineShareAlt className={styles.icone} id={styles.icone_partage} />
                    <span className={styles.interraction_count}>{props.nombrePartage}</span>
                </div>
            </div>

            {!props.isPostFullScreen && (
                <AnimatePresence>
                    {isReponsesOpen ? <SectionReponses idParent={props.idPost} /> : ''}
                </AnimatePresence>)}

        </div>
    )
}

export default PostFooter;