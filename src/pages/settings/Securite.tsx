import {SetStateAction, useEffect, useState} from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import {motion} from "framer-motion";
import {auth} from '../../firebase';
import toast from 'react-hot-toast';
import {Client} from '@passwordlessdev/passwordless-client';
import {GoPasskeyFill} from "react-icons/go";
import Timestamp from '../../components/Timestamp';
import {
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    updatePassword
} from 'firebase/auth';
import {MdDeleteForever} from 'react-icons/md';
import Modal from '../../components/Modal';

function Securite() {
    const passwordlessClient = new Client({
        apiKey: process.env.REACT_APP_PASSWORDLESS_PUBLIC_KEY || ""
    });

    const [passkeysList, setPasskeysList] = useState<any[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    useEffect(() => {
        getPasskeys();
    }, [])

    function changePassword() {
        setCurrentPassword('')
        setNewPassword('')
        setNewPasswordConfirmation('')

        if (newPassword != newPasswordConfirmation) {
            toast.error("La confirmation de mot de passe n'est pas égale au mot de passe.")
            return
        }

        const user = auth.currentUser

        if (user && user.email && currentPassword && newPassword) {
            var credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            reauthenticateWithCredential(user, credential).then(() => {
                updatePassword(user, newPassword.trim()).then(() => {
                    toast.success("Mot de passe modifié.")
                }).catch((error) => {
                    toast.error(`Une erreur est survenue: (${error.code})`)
                });
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            });
        }
    }

    function getPasskeys() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {

                    fetch(process.env.REACT_APP_API_URL + '/user/passkeys/list', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        }

                    }).then(response => response.json()).then(response => {
                        setPasskeysList(response["values"])

                    }).catch(error => console.log(error));
                })
            }
        })
    }

    function addPasskey() {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {

            let keyNickname = prompt("Entrez le nom de la clé d'accès.");

            if (keyNickname) {
                fetch(process.env.REACT_APP_API_URL + '/user/passkeys/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': idToken
                    }
                }).then(response => response.json()).then(response => {
                    const token = response['token'];

                    passwordlessClient.register(token, keyNickname || "Mon téléphone").then(verifyToken => {

                        if (verifyToken) {
                            getPasskeys();

                        } else {
                            console.log("erreur de passkey");
                        }
                    })
                }).catch((error) => {
                    toast.error(`Une erreur est survenue: (${error.code})`)
                })
            }
        })
    }

    function deletePasskey(credentialId: string) {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {

            const confirmation = window.confirm("Voulez vous vraiment supprimer la clé d'accès?")

            if (confirmation) {
                fetch(process.env.REACT_APP_API_URL + `/user/passkeys/${credentialId}/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': idToken
                    }
                }).then(response => {
                    if (response.ok) {
                        toast.success("Clé d'accès supprimée avec succès.")
                        getPasskeys();
                    } else {
                        toast.error(`Une erreur est survenue: (${response.json()})`)
                    }
                })
            }
        })
    }

    return (
        <div className={styles.container_parametres}>
            <motion.div initial={{x: "-15%", opacity: 0}} animate={{x: 0, opacity: 1}}>
                <h1 className={'global_title'} id={styles["titleParametres"]}>Sécurité</h1>
                <div>
                    <h2>Modifer le mot de passe</h2>
                    <label className={'global_label'}>Mot de passe actuel</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <label className={'global_label'}>Nouveau mot de passe</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label className={'global_label'}>Confirmez le nouveau mot de passe</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="password"
                        value={newPasswordConfirmation}
                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    />

                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changePassword()}
                                disabled={!currentPassword.trim() || !newPassword.trim()}>
                            Modifier
                        </button>
                    </div>
                </div>
                <div>
                    <h2>Clés d'accès (Passkeys)</h2>
                    <p>Les clés d'accès sont plus sécuritaires et plus pratiques que les mots de passes
                        traditionnels.</p>
                    {
                        passwordlessClient.isBrowserSupported() ? "" :
                            <p>Votre navigateur ne supporte pas les clés d'accès.</p>
                    }
                    <button className='global_selected_bouton' disabled={!passwordlessClient.isBrowserSupported()}
                            onClick={() => addPasskey()}>
                        <GoPasskeyFill style={{marginLeft: '-10px', marginRight: '6px'}}/> Ajouter une clé d'accès
                    </button>

                    {passkeysList.map((passkey) => (
                        <div key={passkey.descriptor.id} className={styles.passkey_list_item}>
                            <div className={styles.titre_passkey_grid}>
                                <h3 className={styles.titre_passkey}>{passkey.nickname}</h3>
                                <button className={styles.bouton_supprimer}
                                        onClick={() => deletePasskey(passkey.descriptor.id)}>
                                    <MdDeleteForever className={styles.icone_supprimer}/>
                                </button>
                            </div>
                            <p><b>Dernière utilisation: </b><Timestamp date={passkey.lastUsedAt}/> sur {passkey.device}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Securite;