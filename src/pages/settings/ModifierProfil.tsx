import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import ReactCrop, {Crop} from "react-image-crop";




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

    const [cropProfil, setCropProfil] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })


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
                fetch(process.env.REACT_APP_API_URL + '/changer_nom_affichage', {
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
                fetch(process.env.REACT_APP_API_URL + '/changer_nom', {
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
                fetch(process.env.REACT_APP_API_URL + '/changer_prenom', {
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
                fetch(process.env.REACT_APP_API_URL + '/changer_bio', {
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

            <h3>Modifier l'image de profil</h3>
            <input
                type={'file'}
                accept={'image/'}
            />
            <ReactCrop crop={cropProfil} onChange={c => setCropProfil(c)}>
                <img src={'http://localhost:3000/default_profile_image.jpg'} />
            </ReactCrop>
        </motion.div>
    );
}

export default ModifierProfil;