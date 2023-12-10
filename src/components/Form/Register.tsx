import { useState } from "react";
import styles from '../../styles/LoginRegisterForm.module.css'
import { getAdditionalUserInfo, getAuth, signInWithPopup, signOut } from "firebase/auth"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai';
import { GithubAuthProvider } from "firebase/auth";

export interface infoCompte {

    username: string,
    prenom: string,
    nom: string,
    email: string,
    password?: string,
    id_github?: string,
    id_compte?: string
}

function RegisterForm() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    function creerNouveauCompte(info: infoCompte) {
        fetch(`${process.env.REACT_APP_API_URL}/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: info.username,
                prenom: info.prenom,
                nom: info.nom,
                email: info.email,
                password: info.password
            }),
        }).then(response => response.json()).then(response => {
            if (response.code) throw response

            toast.success('Votre profil à été créé! Vous pouvez maintenant vous connecter.');
            navigate(0)
        }).catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    toast.error('Le courriel est invalide.');
                    break;

                case 'auth/email-already-exists':
                    toast.error('Le courriel est déjà inscrit.');
                    break;

                case 'auth/weak-password':
                    toast.error('Le mot de passe est trop faible.');
                    break;

                case 'auth/wrong-password':
                    toast.error('Le mot de passe est invalide. Il doit faire au moins 6 caractères.');
                    break;

                case 'ER_DUP_ENTRY':
                    if (error.sqlMessage.includes("courriel")) {
                        toast.error('Le courriel est déjà inscrit.');
                    }

                    if (error.sqlMessage.includes("nom_utilisateur")) {
                        toast.error('Le nom d\'utilisateur est déjà pris.');
                    }

                    break;

                default:
                    toast.error('Une erreur est survenue: ' + error.code)
                    break;
            }
        })
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

    function handleRegister(info: infoCompte) {
        if (password !== passwordConfirmation) {
            toast.error("La confirmation de mot de passe n'est pas égale au mot de passe.")
        } else {
            creerNouveauCompte(info)
        }
    }

    function handleGitHubSignUp(): void {
        const provider = new GithubAuthProvider();

        provider.setCustomParameters({
            'allow_signup': 'true'
        });

        provider.addScope('user');

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                const additionalInfo = getAdditionalUserInfo(result)
                if (additionalInfo) {
                    if (additionalInfo.profile && user) {
                        const profile = additionalInfo.profile
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

                        // ne pas faire si UID deja dans BD
                        creerNouveauCompteGithub(info)
                    }
                }
            }).catch((error) => {
                toast.error(error)
            });
    }

    return (
        <div className={'global_container_1'}>
            <h2 className={'global_title'}>Inscription</h2>
            <motion.div initial={{ opacity: 0, height: 323 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>

                    <label className={'global_label'}>Nom d'utilisateur</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)} />


                    <label className={'global_label'}>Prénom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setPrenom(e.target.value)} />


                    <label className={'global_label'}>Nom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setNom(e.target.value)} />

                    <label className={'global_label'}>Courriel</label>
                    <input
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} />

                    <label className={'global_label'}>Mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} />

                    <label className={'global_label'}>Confirmez le mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)} />

                    <div className={styles.containerBouton}>
                        <button className={'global_selected_bouton'} onClick={() => handleRegister({ username, prenom, nom, email, password })}>
                            Inscription
                        </button>
                    </div>
                </div>

                <br />
                <hr />

                <div className={styles.containerBouton} id={styles.passwordless_login_providers}>
                    <button className={'global_selected_bouton'} onClick={() => handleGitHubSignUp()}>
                        <AiFillGithub style={{ marginLeft: '-10px', marginRight: '6px' }} />Inscription avec GitHub
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default RegisterForm;