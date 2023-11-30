import { SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion } from "framer-motion";
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import { Client } from '@passwordlessdev/passwordless-client';
import { GoPasskeyFill } from "react-icons/go";
import Timestamp from '../../components/Timestamp';
import { onAuthStateChanged } from 'firebase/auth';
import { MdDeleteForever } from 'react-icons/md';
import Modal from '../../components/Modal';

function Securite() {
    const passwordlessClient = new Client({
        apiKey: process.env.REACT_APP_PASSWORDLESS_PUBLIC_KEY || ""
    });

    const [passkeysList, setPasskeysList] = useState<any[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getPasskeys();
    }, [])

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


    /*Set Theme on Refresh*/
    let hueLS = parseInt(window.localStorage.getItem('hue') || "");
    let saturationLS = parseInt(window.localStorage.getItem('saturation') || "");
     
    function changeTheme(hue: number, saturation: number) {
        document.documentElement.style.setProperty('--base_h', hue.toString())
        document.documentElement.style.setProperty('--base_s', saturation.toString() + "%")

    }

    useEffect(() => {
        if (localStorage.getItem("hue") === null || localStorage.getItem("saturation") === null ) {
            changeTheme(270, 30);
        } else {
            changeTheme(hueLS, saturationLS);
        }
      }, []);

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
            <motion.div initial={{ x: "-15%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h1 className={'global_title'} id={styles["titleParametres"]}>Sécurité</h1>
                <div>
                    <h2>Clés d'accès (Passkeys)</h2>
                    <p>Les clés d'accès sont plus sécuritaires et plus pratiques que les mots de passes traditionnels.</p>
                    {
                        passwordlessClient.isBrowserSupported() ? "" : <p>Votre navigateur ne supporte pas les clés d'accès.</p>
                    }
                    <button className='global_selected_bouton' disabled={!passwordlessClient.isBrowserSupported()} onClick={() => addPasskey()}>
                        <GoPasskeyFill style={{ marginLeft: '-10px', marginRight: '6px' }} /> Ajouter une clé d'accès
                    </button>

                    {passkeysList.map((passkey) => (
                        <div key={passkey.descriptor.id} className={styles.passkey_list_item}>
                            <div className={styles.titre_passkey_grid}>
                                <h3 className={styles.titre_passkey}>{passkey.nickname}</h3>
                                <button className={styles.bouton_supprimer} onClick={() => deletePasskey(passkey.descriptor.id)}>
                                    <MdDeleteForever className={styles.icone_supprimer} />
                                </button>
                            </div>
                            <p><b>Dernière utilisation: </b><Timestamp date={passkey.lastUsedAt} /> sur {passkey.device}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Securite;