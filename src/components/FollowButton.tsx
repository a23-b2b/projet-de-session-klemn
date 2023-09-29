import styles from '../styles/Profil.module.css'
import { Dispatch, SetStateAction, useState } from 'react';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Props {
    userId: string;
    displayName: string;

    nombreAbonnes: number;
    setNombreAbonnes: Dispatch<SetStateAction<number>>;
}

function FollowButton(props: Props) {
    const [visitorFollowsUser, setVisitorFollowsUser] = useState(false);
    const [databaseLoading, setDatabaseLoading] = useState(false);

    function followUser() {
        setDatabaseLoading(true)

        auth.currentUser?.getIdToken(/* forceRefresh */ true)
            .then((idToken) => {
                fetch('http://localhost:1111/follow-user', {
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
                            setVisitorFollowsUser(true)
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
                fetch('http://localhost:1111/unfollow-user', {
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
                            setVisitorFollowsUser(false)
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
        <motion.div initial={{ width: 'auto' }} animate={{ width: 'auto' }}>
            <div>
                {props.userId != auth.currentUser?.uid && auth.currentUser && visitorFollowsUser == false && (
                    <button
                        className={`${styles.bouton_follow} global_bouton`}
                        onClick={() => followUser()}
                        disabled={databaseLoading}>Suivre</button>
                )}

                {props.userId != auth.currentUser?.uid && auth.currentUser && visitorFollowsUser == true && (
                    <button
                        className={`${styles.bouton_follow} global_bouton`}
                        onClick={() => unfollowUser()}
                        disabled={databaseLoading}>Ne plus suivre</button>
                )}
            </div>
        </motion.div>
    );
}

export default FollowButton;
