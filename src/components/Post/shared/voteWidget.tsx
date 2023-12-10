import styles from '../../../styles/Post.module.css'
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../firebase';
import toast from 'react-hot-toast';

interface FooterProps {
    idPost: string;
    nombreLike: number;
    nombreDislike: number;
    userVote: number;
}

const VoteWidget = (props: FooterProps) => {
    const [postScore, setPostScore] = useState(props.nombreLike - props.nombreDislike)
    const [userVote, setUserVote] = useState(props.userVote || 0) // le vote de lutilisateur pour afficher le bouton en couleur ou non
    const [scoreDifference, setScoreDifference] = useState(0)
    const [scopeLike, animateLike] = useAnimate()
    const [scopeDislike, animateDisike] = useAnimate()
    const [scopeNumberScore, animateNumberScore] = useAnimate()
    const [loading, setLoading] = useState(false)

    // const [cancelledVote, setCancelledVote] = useRef(false)
    const cancelledVoteRef = useRef(false);

    useEffect(() => {
        if (!localStorage.getItem("voteClickAnimation")) localStorage.setItem("voteClickAnimation", "shake")
        if (!localStorage.getItem("voteTextAnimation")) localStorage.setItem("voteTextAnimation", "slide")
    }, [])

    function handleVote(score: number) {

        if (loading) return

        setLoading(true)

        // idPost = 0 => widget de test dans les parametres
        if (props.idPost === '0') {
            setLoading(false)
            setPostScore(postScore + score)
            setUserVote(score)
        }

        const onVoteIconAnimationType = localStorage.getItem("voteClickAnimation")
        const onVoteTextAnimationType = localStorage.getItem("voteTextAnimation")


        if (score > 0) {
            if (userVote + score == 2) {
                cancelledVoteRef.current = true
            }
            else cancelledVoteRef.current = false
        }

        if (score < 0) {
            if (userVote + score == -2) {
                cancelledVoteRef.current = true
            }
            else cancelledVoteRef.current = false
        }

        // console.log("userVote", userVote)
        // console.log("score", score)
        // console.log('cancelled vote:', cancelledVoteRef.current)

        // Animation pouce LIKE
        if (score > 0) {

            // afficher animation speciale shake
            if (cancelledVoteRef.current && onVoteIconAnimationType === "shake") {
                try {
                    navigator.vibrate([15, 15, 15, 15, 15])
                } catch { }
                animateLike(scopeLike.current, {
                    x: [0, -10, 10, -7, 3, 0],
                }, {
                    duration: 0.4
                })
            }

            // animation normale
            else {
                try {
                    navigator.vibrate([10, 5, 20])
                } catch { }

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
        }

        // Animation pouce DISLIKE
        if (score < 0) {
            // animation speciale shake
            if (cancelledVoteRef.current && onVoteIconAnimationType === "shake") {
                try {
                    navigator.vibrate([15, 15, 15, 15, 15])
                } catch { }
                animateDisike(scopeDislike.current, {
                    x: [0, 10, -10, 7, -3, 0],
                }, {
                    duration: 0.4
                })
            }

            // Animation normale
            else {
                try {
                    navigator.vibrate([10, 5, 20])
                } catch { }
                animateDisike(scopeDislike.current, {
                    scale: 0.7,
                    y: '18px',
                    rotate: Math.floor(Math.random() * 40) - 20,
                }, { duration: 0.15, ease: "anticipate" })
                    .then(() => {
                        animateDisike(scopeDislike.current, {
                            scale: 1,
                            y: '0px',
                            rotate: 0,
                        }, { duration: 0.3, type: "spring", bounce: 0.6 })
                    })
            }
        }

        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {

            // Animation slide texte vers le bas (LIKE et CANCEL DISLIKE)
            if (!cancelledVoteRef.current && score > 0 || cancelledVoteRef.current && score < 0) {
                animateNumberScore(scopeNumberScore.current, {
                    y: onVoteTextAnimationType === "slide" && '20px',
                    opacity: 0,
                }, {
                    duration: 0.1
                })
            }

            // Animation slide texte vers le haut (DISLIKE et CANCEL LIKE)
            else if (!cancelledVoteRef.current && score < 0 || cancelledVoteRef.current && score > 0) {
                animateNumberScore(scopeNumberScore.current, {
                    y: onVoteTextAnimationType === "slide" && '-20px',
                    opacity: 0,
                }, {
                    duration: 0.1
                })
            }

            fetch(props.idPost === "0" ? '0' : `${process.env.REACT_APP_API_URL}/post/${props.idPost}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    score: score,
                }),
            }).then(response => response.json())
                .then(response => {
                    // console.log('before', postScore)
                    // console.log('diff', score)
                    // console.log('result:', response['postScoreDifference'] + postScore)
                    setPostScore(response['postScoreDifference'] + postScore)
                    setUserVote(response['currentUserVote'])
                    setScoreDifference(response['postScoreDifference'])
                    setLoading(false)
                }).catch((error) => {
                    toast.error(error)
                    props.idPost != '0' && toast.error('Une erreur est survenue');
                }).then(() => {

                    // console.log("LIKE & CANCEL DISLIKE", score > 0 || cancelledVoteRef.current && score < 0)
                    // console.log("DISLIKE & CANCEL LIKE", score < 0 || cancelledVoteRef.current && score > 0)
                    // Animation slide texte vers le haut (LIKE et CANCEL DISLIKE)
                    if (!cancelledVoteRef.current && score > 0 || cancelledVoteRef.current && score < 0) {
                        animateNumberScore(scopeNumberScore.current, {
                            y: onVoteTextAnimationType === "slide" && [-20, 0],
                            opacity: [0, 1],
                        }, {
                            duration: 0.1
                        })
                    }

                    // Animation slide texte vers le haut (DISLIKE et CANCEL LIKE)
                    else if (!cancelledVoteRef.current && score < 0 || cancelledVoteRef.current && score > 0) {
                        animateNumberScore(scopeNumberScore.current, {
                            y: onVoteTextAnimationType === "slide" && [20, 0],
                            opacity: [0, 1],
                        }, {
                            duration: 0.1
                        })
                    }
                })
        })
    }

    return (
        <div>
            <motion.div className={styles.like_dislike_container} /*layout*/>

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

        </div>
    )
}

export default VoteWidget;