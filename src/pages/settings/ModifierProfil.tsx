import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';




function ModifierProfil() {
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newEmailConfirmation, setNewEmailConfirmation] = useState('');

    const [newNameAffichage, setNewNameAffichage] = useState('');
    const [newNameAffichageConfirmation, setNewNameAffichageConfirmation] = useState('');

    const [newName, setNewName] = useState('');
    const [newNameConfirmation, setNewNameConfirmation] = useState('');

    const [newPrenom, setNewPrenom] = useState('');
    const [newPrenomConfirmation, setNewPrenomConfirmation] = useState('');

    const [newBio, setNewBio] = useState('');




    const changeEmail = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                updateEmail(user.user, newEmail).then(() => {
                    toast.success("Courriel mis à jour!")
                }).catch((error) => {
                    toast.error(`Une erreur est survenue! (${error.code})`)
                });
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }

    const changeNameAffichage = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/publier-blogue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_name_affichage: newNameAffichage,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }


    const changeName = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/publier-blogue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_name: newName,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }



    const changePrenom = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/publier-blogue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_prenom: newPrenom,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }



    const changeBio = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/publier-blogue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_bio: newBio,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }





    return (
        <motion.div className={'global_conteneur_parametres'} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1 id={styles["titre_modifier_profil"]} className={'global_title'}>Modifier Profil</h1>

            <div>

                <h3 className={styles.section_titre}>Modifier le courriel</h3>
                <hr className={styles.hr}></hr>

                <div className={styles.form}>
                    <label className={'global_input_field_label'}>Nouveau courriel</label>
                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <label className={'global_input_field_label'}>Confirmez le courriel</label>
                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setNewEmailConfirmation(e.target.value)}
                    />

                    <button id={styles["section_boutton"]} className={'global_bouton'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation}>
                        Modifier
                    </button>
                </div>

            </div>

            <br />

            <div>

                <h3 className={styles.section_titre}>Modifier le nom d'affichage</h3>
                <hr className={styles.hr}></hr>
                
                <label className={'global_input_field_label'}>Nouveau nom d'affichage </label>
                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewNameAffichage(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le nom d'affichage</label>

                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewNameAffichageConfirmation(e.target.value)}
                />
                <button id={styles["section_boutton"]} className={'global_bouton'} onClick={() => changeNameAffichage()} disabled={newNameAffichage !== newNameAffichageConfirmation}>
                    Modifier
                </button>

            </div>
            <br />

            <div>
                <h3 className={styles.section_titre}>Modifier le nom </h3>
                <hr className={styles.hr}></hr>

                <label className={'global_input_field_label'}>Nouveau nom  </label>
                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le nom </label>

                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewNameConfirmation(e.target.value)}
                />
                <button id={styles["section_boutton"]} className={'global_bouton'} onClick={() => changeName()} disabled={newName !== newNameConfirmation}>
                    Modifier
                </button>
            </div>

            <br />
            <div >
                <h3 className={styles.section_titre}>Modifier le prenom </h3>
                <hr className={styles.hr}></hr>
                
                <label className={'global_input_field_label'}>Nouveau prenom </label>
                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewPrenom(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le prenom </label>

                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewPrenomConfirmation(e.target.value)}
                />
                <button id={styles["section_boutton"]} className={'global_bouton'} onClick={() => changePrenom()} disabled={newPrenom !== newPrenomConfirmation}>
                    Modifier
                </button>
            </div>

            <br />
            <div >
                <h3 className={styles.section_titre}>Modifier le Bio </h3>
                <hr className={styles.hr}></hr>

                <label className={'global_input_field_label'}>Nouveau Bio </label>
                <input
                    className={'global_input_field'}
                    onChange={(e) => setNewBio(e.target.value)}
                />
                <button id={styles["section_boutton"]} className={'global_bouton'} onClick={() => changeBio()} disabled={newBio === ""}>
                    Modifier
                </button>

            </div>



        </motion.div>
    );
}

export default ModifierProfil;