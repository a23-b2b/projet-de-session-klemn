import { useState } from "react";
import styles from '../../styles/LoginRegisterForm.module.css'
import { GithubAuthProvider, signInWithCustomToken, getAdditionalUserInfo, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai';
import { infoCompte } from './Register'
import { Client } from "@passwordlessdev/passwordless-client";
import { GoPasskeyFill } from "react-icons/go";

function LoginForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const passwordlessClient = new Client({
        apiKey: "klemn:public:8557b931c74a43ae8990c94bbb5aa62c"
    });

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

    async function credentialValide(uid: string, ghid: string): Promise<boolean> {
        const retour: boolean = await fetch(`${process.env.REACT_APP_API_URL}/user/${uid}/${ghid}/validate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            return response.valide
        }).catch((err) => {
            console.log(JSON.stringify(err))
            throw err
        })

        return retour
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
                    toast.error('Ce compte existe deja');
                    break;
            }

            const auth = getAuth();
            signOut(auth)
            navigate("/authenticate")
        })
    }


    async function handleGithubLogin() {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then(async (result) => {
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
                            const estValide: boolean = await credentialValide(user.uid, id)
                            // Par valide, je veux dire existant dans la BD selon les infos retournés par firebase
                            // Si pas valide, il faut le créer dans la BD mysql et puis sign in the user
                            if (estValide == false) {
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

    function loginWithPasskey() {
        passwordlessClient.signinWithDiscoverable().then(token => {
            fetch(process.env.REACT_APP_API_URL + '/user/passkeys/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token["token"]
                })
            }).then(response => response.json()).then(json => {
                const customToken = json["customToken"];

                signInWithCustomToken(auth, customToken).then((user) => {
                    toast.success('Vous êtes connecté!')
                    navigate('/')

                }).catch((error) => {
                    console.log(error)
                    toast.error(`Une erreur est survenue: (${error.code})`)
                })
            })
        })
    }

    return (

        <div className={'global_container_1'}>
            <h2 className={'global_title'}>Connexion</h2>
            <motion.div initial={{ opacity: 0, height: 660 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>
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
                    <div className={styles.containerBouton}>
                        <button className={'global_selected_bouton'} onClick={() => loginWithEmailAndPassword(email, password)}>
                            Connexion
                        </button>
                    </div>
                </div>

                <br />
                <hr />

                <div className={styles.containerBouton} id={styles.passwordless_login_providers}>
                    <button className={'global_selected_bouton'} onClick={() => loginWithPasskey()}>
                        <GoPasskeyFill style={{ marginLeft: '-10px', marginRight: '6px' }} /> Utiliser une clé d'accès
                    </button>
                    <button className={'global_selected_bouton'} onClick={() => handleGithubLogin()}>
                        <AiFillGithub style={{ marginLeft: '-10px', marginRight: '6px' }} />Connexion avec GitHub
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginForm;