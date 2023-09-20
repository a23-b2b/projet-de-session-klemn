import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
// const express = require('express')
// const app = express()
// const { check, body, validationResult } = require('express-validator');
// const mysql = require('mysql2')



function ModifierProfil() {
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newEmailConfirmation, setNewEmailConfirmation] = useState('');

    const [newName, setNewName] = useState('');
    const [newNameConfirmation, setNewNameConfirmation] = useState('');

    // const mysqlConnection = mysql.createConnection({
    //     host: process.env.MYSQL_HOSTNAME,
    //     port: process.env.MYSQL_PORT,
    //     user: process.env.MYSQL_USERNAME,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.MYSQL_DATABASE
    // })


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

    // const changeName = () => {
    //     let password = prompt('Pour continuer, entrez votre mot de passe');

    //     let user = auth.currentUser;

    //     if (user && user.email && password) {
    //         var credential = EmailAuthProvider.credential(
    //             user.email,
    //             password
    //         );

    //         reauthenticateWithCredential(user, credential).then((user) => {
    //             const id_compte = user.user; // Remplacez par le moyen de récupérer l'ID de l'utilisateur
    //             const newName = "NouveauNom"; // Remplacez par le nouveau nom d'utilisateur

    //             // Vous devrez maintenant effectuer une requête MySQL pour mettre à jour le nom dans la base de données.
    //             // Voici un exemple de requête MySQL pour mettre à jour le nom d'utilisateur :

    //             mysqlConnection.query(
    //                 `UPDATE compte SET nom_utilisateur = ? WHERE id_compte = ?`,
    //                 [newName, id_compte],

    //             );
    //         }).catch((error) => {
    //             toast.error(`Une erreur est survenue! (${error.code})`)
    //         });
    //     }
    // }


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
                    Inscription
                </button>
            </div>
            <br />


            <h3>Modifier le nom</h3>
            <label className={'global_input_field_label'}>Nouveau nom</label>
            <input
                className={'global_input_field'}
                onChange={(e) => setNewName(e.target.value)}
            />
            <label className={'global_input_field_label'}>Confirmez le nom</label>

            <input
                className={'global_input_field'}
                onChange={(e) => setNewNameConfirmation(e.target.value)}
            />
            {/* <button className={'global_button'} onClick={() => changeName()} disabled={newName !== newNameConfirmation}>
                Inscription
            </button> */}



        </motion.div>
    );
}

export default ModifierProfil;