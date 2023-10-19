import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';




function ModifierProfil() {
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
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/display_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name_affichage: newNameAffichage,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeName = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/nom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name: newName,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changePrenom = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/prenom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_prenom: newPrenom,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeBio = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_bio: newBio,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }


    return (
        <motion.div className={styles.container} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1>Modifier Profil</h1>

            <h3>Modifier le courriel</h3>

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
                <button className={'global_button'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation}>
                    Modifier
                </button>
            </div>
            <br />


            <h3>Modifier le nom d'affichage</h3>
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
            <button className={'global_button'} onClick={() => changeNameAffichage()} disabled={newNameAffichage !== newNameAffichageConfirmation}>
                Modifier
            </button>

            <h3>Modifier le nom </h3>
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
            <button className={'global_button'} onClick={() => changeName()} disabled={newName !== newNameConfirmation}>
                Modifier
            </button>


            <h3>Modifier le prenom </h3>
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
            <button className={'global_button'} onClick={() => changePrenom()} disabled={newPrenom !== newPrenomConfirmation}>
                Modifier
            </button>

            <h3>Modifier le Bio </h3>
            <label className={'global_input_field_label'}>Nouveau Bio </label>
            <input
                className={'global_input_field'}
                onChange={(e) => setNewBio(e.target.value)}
            />
            <button className={'global_button'} onClick={() => changeBio()} disabled={newBio === ""}>
                Modifier
            </button>



        </motion.div>
    );
}

export default ModifierProfil;