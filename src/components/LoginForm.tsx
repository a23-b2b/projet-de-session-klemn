import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { GithubAuthProvider, deleteUser, getAdditionalUserInfo, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai';
import { infoCompte } from './RegisterForm'

function LoginForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function loginWithEmailAndPassword(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success('Vous êtes connecté!')
                navigate('/')
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error('Le compte spécifié n\'existe pas.')
                        break;
                    case 'auth/wrong-password':
                        toast.error('Le mot de passe est incorrect.')
                        break;
                    case 'auth/invalid-email':
                        toast.error('Le courriel est invalide.')
                        break;
                    default:
                        toast.error('Une erreur est survenue: ' + error.name)
                        break;
                }
            });
    }

    function credentialValide(uid: string, ghid: string): Boolean {
        let estValide = false

        fetch(`${process.env.REACT_APP_API_URL}/user/${uid}/${ghid}/validate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            return response.valide
        }).catch((err) => {
            throw err
        })

        return estValide

    }

    function creerNouveauCompteGithub(info: infoCompte) {
        fetch(`${process.env.REACT_APP_API_URL}/user/create-github`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                github_id: info.id_github,
                username: info.username,
                prenom: info.prenom,
                nom: info.nom,
                email: info.email,
                id_compte: info.id_compte
            }),
        }).then(response => response.json()).then(response => {
            if (response.code) throw response

            toast.success('Votre profil à été créé! Vous pouvez maintenant vous connecter.');
            navigate(0)
        }).catch((error) => {
            switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                    toast.error('Ce compte existe avec informations différente')
                    break;
                case 'auth/email-already-exists':
                    toast.error('Le courriel est déjà inscrit.');
                    break;
                case 'ER_DUP_ENTRY':
                    if (error.sqlMessage.includes("courriel")) {
                        toast.error('Le courriel est déjà inscrit.');
                    }
                    if (error.sqlMessage.includes("nom_utilisateur")) {
                        toast.error('Le nom d\'utilisateur est déjà pris.');
                    }
                    if (error.sqlMessage.includes("PRIMARY")) {
                        toast.error('Ce compte existe deja');
                    }
                    break;
            }

            const auth = getAuth();

            signOut(auth).then(() => {
                toast.error("Erreur lors de l'inscription" + error.code)
            })

        })
    }


    function handleGithubLogin() {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    console.log("Credentials: " + JSON.stringify(credential))
                }

                // The signed-in user info.
                const user = result.user;
                if (user) {
                    console.log("User info: " + JSON.stringify(user))

                    // check si UID firebase est dans BD sinon creer le compte

                    // IdP data available using getAdditionalUserInfo(result)
                    const additionalInfo = getAdditionalUserInfo(result)
                    if (additionalInfo) {
                        if (additionalInfo.profile) {
                            const profile = additionalInfo.profile
                            const id: string = typeof (profile.id) == 'number' ? profile.id.toString() : ""

                            // Par valide, je veux dire existant dans la BD selon les infos retournés par firebase
                            // Si pas valide, il faut le créer dans la BD mysql et puis sign in the user
                            if (credentialValide(user.uid, id) == false) {
                                var prenom = "UNKNOWN"
                                var nom = "UNKNOWN"

                                const info: infoCompte = {
                                    id_compte: typeof (user.uid) == 'string' ? user.uid : undefined,
                                    username: typeof (profile.login) == 'string' ? profile.login : "",
                                    prenom: prenom,
                                    nom: nom,
                                    email: typeof (user.email) == 'string' ? user.email : "",
                                    id_github: typeof (profile.id) == 'number' ? profile.id.toString() : undefined,
                                }

                                creerNouveauCompteGithub(info)
                            }
                        }
                    }

                }



                navigate('/')
            }).catch((error) => {
                console.log(JSON.stringify(error))
            });
    }

    return (

        <div className={'global_conteneur'}>
            <h2 className={'global_title'}>Connexion</h2>
            <motion.div initial={{ opacity: 0, height: 660 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>
                    <label className={'global_input_field_label'}>Courriel</label>
                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />

                    <label className={'global_input_field_label'}>Mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.containerBouton}>
                        <button className={'global_bouton'} onClick={() => loginWithEmailAndPassword(email, password)}>
                            Connexion
                        </button>

                        <button className={'global_bouton'} style={{ margin: '10px' }} onClick={() => handleGithubLogin()}>
                            Connexion avec GitHub <AiFillGithub />
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

export default LoginForm;