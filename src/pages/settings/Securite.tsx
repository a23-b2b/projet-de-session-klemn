import { useEffect, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion } from "framer-motion";
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import { Client } from '@passwordlessdev/passwordless-client';
import { GoPasskeyFill } from "react-icons/go";
import Timestamp from '../../components/Timestamp';

function Securite() {
    const passwordlessClient = new Client({
        apiKey: "klemn:public:8557b931c74a43ae8990c94bbb5aa62c"
    });

    const [passkeysList, setPasskeysList] = useState<any[]>([]);

    useEffect(() => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            getPasskeys(idToken);
        })
    }, []);

    function getPasskeys(idToken: string) {
        fetch(process.env.REACT_APP_API_URL + '/user/passkeys/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': idToken
            }
            
        }).then(response => response.json()).then(response => {
            setPasskeysList(response["values"])

        }).catch(error => console.log(error));
    }

    function addPasskey() {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/passkeys/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                }
            }).then(response => response.json()).then(response => {
                const token = response['token'];

                let keyNickname = prompt("Entrez le nom de la clé d'accès.")

                passwordlessClient.register(token, keyNickname ? keyNickname : auth.currentUser?.email || '')
                    .then(verifyToken => {
                        if (verifyToken) {
                            // Successfully registered!
                            console.log("passkey ajoute");
                            getPasskeys(idToken);
                        } else {
                            console.log("erreur de passkey");
                            // console.error(error);
                        }
                    })
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
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
                        <div key={passkey.descriptor.id}>
                            <h4>{passkey.device}</h4>
                            <p>{passkey.nickname}</p>
                            <p><b>Dernière utilisation: </b><Timestamp date={passkey.lastUsedAt}/></p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Securite;