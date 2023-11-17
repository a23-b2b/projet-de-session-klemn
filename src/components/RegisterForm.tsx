import { useState } from "react";
import styles from '../styles/LoginRegisterForm.module.css'
import { createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, getRedirectResult, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai';
import { GithubAuthProvider } from "firebase/auth";
import { type } from "os";

interface infoCompte {
     
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

    // le post de creation de compte actuel valide les info et puis create user mais avec github cest different le service creeer le user par lui meme
    // Il faut donc prendre en charge deux maniere de creation de compte
    // Il y a aussi aucun mot de passe 
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

    /*
    id: varchar("id_compte", { length: 255 }).notNull().primaryKey(),
    idGithub: varchar("id_github", {length: 255}).unique(), // Permet d'identifier un utilisateur auprès de l'API REST GitHub
    email: varchar("courriel", { length: 255 }).notNull().unique(),
    firstName: varchar("prenom", { length: 255 }).notNull(),
    lastName: varchar("nom", { length: 255 }).notNull(),
    userName: varchar("nom_utilisateur", { length: 255 }).notNull().unique(),
    */
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
            // TODO: Gestion erreur selon methode de sign up
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
                    break;
                default:
                    toast.error('Une erreur est survenue: ' + error.code)
                    break;
            }
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
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                if (credential) {
                    // Credentials: {"accessToken":"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","pendingToken":null,"providerId":"github.com","signInMethod":"github.com"}
                    const token = credential.accessToken;
                    console.log("Credentials: " + JSON.stringify(credential))
                }

                // The signed-in user info.
                const user = result.user;
                if (user) {
                    console.log(JSON.stringify(user))
                }
                // IdP data available using getAdditionalUserInfo(result)
                const additionalInfo = getAdditionalUserInfo(result)
                if (additionalInfo) {
                    /* 
                    {"isNewUser":false,"
                    providerId":"github.com",
                    "profile": {
                        "gists_url":"https://api.github.com/users/Nathan-Cournoyer/gists{/gist_id}",
                        "repos_url":"https://api.github.com/users/Nathan-Cournoyer/repos",
                        "following_url":"https://api.github.com/users/Nathan-Cournoyer/following{/other_user}",
                        "twitter_username":null,
                        "bio":null,
                        "created_at":"2021-01-27T16:41:31Z",
                        "login":"Nathan-Cournoyer",
                        "type":"User","blog":"",
                        "subscriptions_url":"https://api.github.com/users/Nathan-Cournoyer/subscriptions",
                        "updated_at":"2023-11-08T13:11:25Z",
                        "site_admin":false,
                        "company":"Collège Bois-de-Boulogne",
                        "id":78099040,
                        "public_repos":0,
                        "gravatar_id":"",
                        "email":null,
                        "organizations_url":"https://api.github.com/users/Nathan-Cournoyer/orgs",
                        "hireable":null,
                        "starred_url":"https://api.github.com/users/Nathan-Cournoyer/starred{/owner}{/repo}",
                        "followers_url":"https://api.github.com/users/Nathan-Cournoyer/followers","public_gists":0,"url":"https://api.github.com/users/Nathan-Cournoyer",
                        "received_events_url":"https://api.github.com/users/Nathan-Cournoyer/received_events","followers":0,"avatar_url":"https://avatars.githubusercontent.com/u/78099040?v=4",
                        "events_url":"https://api.github.com/users/Nathan-Cournoyer/events{/privacy}","html_url":"https://github.com/Nathan-Cournoyer","following":1,
                        "name":"Nathan Cournoyer","location":null,"node_id":"MDQ6VXNlcjc4MDk5MDQw"},
                        "username":"Nathan-Cournoyer"
                    }
                    */
                    console.log(JSON.stringify( additionalInfo))
                    
                    if (additionalInfo.profile && user) {
                        const profile = additionalInfo.profile
                        var prenom = "UNKNOWN"
                        var nom = "UNKNOWN"
                        const prenomNom : Array<string> = typeof(profile.username) === 'string' ? profile.username.split(' '): [prenom, nom]
                        
                        // https://www.w3schools.com/JS//js_typeof.asp
                        if (prenomNom.constructor === Array){
                            if (prenomNom[0]) {
                                prenom = prenomNom[0]
                            }
                            if (prenomNom[1]) {
                                nom = prenomNom[1]
                            }
                        }
                        
                        const info: infoCompte = {
                            id_compte: typeof(user.uid) == 'string' ? user.uid : undefined,
                            username: typeof(profile.login) == 'string' ? profile.login: "",
                            prenom: prenom,
                            nom: nom,
                            email: typeof(user.email) == 'string' ? user.email : "",
                            id_github: typeof(profile.id) == 'number' ? profile.id.toString() : undefined,
                        }
                        creerNouveauCompteGithub(info)
                    }
                }                            
            }).catch((error) => {
                console.log(JSON.stringify(error))

                const user = auth.currentUser;

                deleteUser(user!).then(() => {
                    console.log("Erreur utilisateur deleted: " + JSON.stringify(error))
                }).catch((error) => {
                    console.log("Erreur lors delete user: " + JSON.stringify(error))
                });
            });
    }

    return (
        <div className={'global_conteneur'}>
            <h2 className={'global_title'}>Inscription</h2>
            <motion.div initial={{ opacity: 0, height: 323 }} animate={{ opacity: 1, height: "auto" }}>
                <div className={styles.form}>

                    <label className={'global_input_field_label'}>Nom d'utilisateur</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)} />


                    <label className={'global_input_field_label'}>Prénom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setPrenom(e.target.value)} />


                    <label className={'global_input_field_label'}>Nom</label>
                    <input
                        className={'global_input_field'}
                        type="text"
                        onChange={(e) => setNom(e.target.value)} />

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

                    <label className={'global_input_field_label'}>Confirmez le mot de passe</label>
                    <input
                        className={'global_input_field'}
                        type="password"
                        onChange={(e) => setPasswordConfirmation(e.target.value)} />

                    <div className={styles.containerBouton}>
                        <button className={'global_bouton'} onClick={() => handleRegister({username, prenom, nom, email, password})}>
                            Inscription
                        </button>

                        <button className={'global_bouton'} style={{ margin: '10px' }} onClick={() => handleGitHubSignUp()}>
                            Inscription avec GitHub <AiFillGithub />
                        </button>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default RegisterForm;