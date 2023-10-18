import styles from '../styles/Profil.module.css'
import { Dispatch, SetStateAction, useState } from 'react';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';

interface Props {
    userId: string;
    displayName: string;
    visitorFollowsUser: boolean;
    setVisitorFollowsUser: Dispatch<SetStateAction<boolean>>;


    nombreAbonnes: number;
    setNombreAbonnes: Dispatch<SetStateAction<number>>;
}

function FollowButton(props: Props) {
    const [databaseLoading, setDatabaseLoading] = useState(false);
    const [buttonScope, animateButton] = useAnimate()

    function followUser() {
        setDatabaseLoading(true)

        auth.currentUser?.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
                fetch(process.env.REACT_APP_API_URL + '/user/follow', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: auth.currentUser?.uid,
                        wants_to_follow: props.userId,
                        firebase_id_token: idToken
                    }),
                }).then(response => response)
                    .then(response => {
                        if (response.status === 401) {
                            toast.error("Vous ne pouvez pas suivre le même compte plus d'une fois.");
                        }

                        if (response.status === 200) {
                            toast.success(`Vous suivez maintenant ${props.displayName}!`);
                            props.setNombreAbonnes(props.nombreAbonnes + 1)
                            props.setVisitorFollowsUser(true)
                            setDatabaseLoading(false)
                        }

                    }).catch((error) => {
                        console.log(error)
                        toast.error('Une erreur est survenue');
                        setDatabaseLoading(false)
                    })
            })
    }

    function unfollowUser() {
        setDatabaseLoading(true)

        auth.currentUser?.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
                fetch(process.env.REACT_APP_API_URL + '/unfollow-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: auth.currentUser?.uid,
                        wants_to_unfollow: props.userId,
                        firebase_id_token: idToken
                    }),
                }).then(response => response)
                    .then(response => {
                        if (response.status === 401) {
                            toast.error("Vous ne suivez pas cet utilisateur.");
                        }

                        if (response.status === 200) {
                            toast.success(`Vous ne suivez plus ${props.displayName}.`);
                            props.setNombreAbonnes(props.nombreAbonnes - 1)
                            props.setVisitorFollowsUser(false)
                            setDatabaseLoading(false)
                        }

                    }).catch((error) => {
                        console.log(error)
                        toast.error('Une erreur est survenue');
                        setDatabaseLoading(false)
                    })
            })
    }

    return (
        <motion.div>
            <div>
                {props.userId != auth.currentUser?.uid && auth.currentUser && (
                    <button
                        ref={buttonScope}
                        className={`${styles.bouton_follow} global_bouton`}
                        onClick={props.visitorFollowsUser ? () => unfollowUser() : () => followUser()}
                        disabled={databaseLoading}>

                        { props.visitorFollowsUser ? 'Ne plus suivre' : 'Suivre' }
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default FollowButton;
