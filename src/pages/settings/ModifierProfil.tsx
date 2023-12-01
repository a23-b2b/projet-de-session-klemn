import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import {
    EmailAuthProvider,
    GithubAuthProvider,
    getAdditionalUserInfo,
    linkWithPopup,
    onAuthStateChanged,
    reauthenticateWithCredential,
    unlink,
    signInWithCustomToken
} from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import ReactCrop, { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import { FaRegFolderOpen } from 'react-icons/fa6';
import { Button } from '@chakra-ui/button';
import { AiFillGithub } from 'react-icons/ai';
import {response} from "express";




function ModifierProfil() {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmailConfirmation, setNewEmailConfirmation] = useState('');
    const [newNameAffichage, setNewNameAffichage] = useState('');
    const [newNameAffichageConfirmation, setNewNameAffichageConfirmation] = useState('');
    const [newName, setNewName] = useState('');
    const [newNameConfirmation, setNewNameConfirmation] = useState('');
    const [newPrenom, setNewPrenom] = useState('');
    const [newPrenomConfirmation, setNewPrenomConfirmation] = useState('');
    const [newBio, setNewBio] = useState('');

    const [cropProfil, setCropProfil] = useState<Crop>()
    const [urlImageProfil, setUrlImageProfil] = useState('')
    const imgProfilRef = useRef<HTMLImageElement>()

    const [githubLinked, setGithubLinked] = useState(false)

    const githubProvider = new GithubAuthProvider();

    useEffect(() => {
        getUser();
    }, []);

    const changeEmail = () => {
        setNewEmailConfirmation('')
        setPassword('')

        const user = auth.currentUser;

        if (user && user.email && password) {
            let credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then(() => {
                user?.getIdToken(/* forceRefresh */ true).then((idToken) => {

                    fetch(`${process.env.REACT_APP_API_URL}/user/update/courriel`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            new_email: newEmail.trim(),
                        }),
                    }).then(response => {
                        if (response.ok) {
                            response.json().then(response => {
                                signInWithCustomToken(auth, response).then(() => {
                                    toast.success('Courriel modifié.');
                                    setNewEmail('')
                                }).catch((error) => {
                                    toast.error(`Une erreur est survenue: (${error.code})`)
                                })
                            }).catch((error) => {
                                toast.error(`Une erreur est survenue: (${error.code})`)
                            })
                        } else {
                            response.json().then(response => {
                                toast.error(`Une erreur est survenue: (${response})`)
                            })
                        }

                    })
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
            });

        }
    }

    const changeNameAffichage = () => {
        setNewNameAffichageConfirmation('')

        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/display_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name_affichage: newNameAffichage.trim(),
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Nom d\'affichage modifié.')
                setNewNameAffichage('')
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeName = () => {
        setNewNameConfirmation('')

        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/nom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name: newName.trim(),
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Nom modifié.');
                setNewName('')
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changePrenom = () => {
        setNewPrenomConfirmation('')

        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/prenom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_prenom: newPrenom.trim(),
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Prénom modifié.');
                setNewPrenom('')
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeBio = () => {
        setNewBio('');
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_bio: newBio.trim(),
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Bio modifiée.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    async function getUser() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/username/${user.uid}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                    }).then(response => response.json()).then(response => {

                        if (response[0].id_github == null) {
                            setGithubLinked(false)
                        } else {
                            setGithubLinked(true)
                        }

                    }).catch((error) => {
                        toast.error(`Une erreur est survenue: ${error}`)
                    })
                })
            }
        })
    }

    function onImageProfilLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        // Reference: https://www.npmjs.com/package/react-image-crop
        const { width, height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 100,
                },
                1,
                width,
                height
            ),
            width,
            height
        )

        imgProfilRef.current = e.currentTarget
        setCropProfil(convertToPixelCrop(crop, width, height));
    }

    function onInputProfilLoad(event: React.SyntheticEvent<HTMLInputElement, Event>) {
        if (urlImageProfil) {
            URL.revokeObjectURL(urlImageProfil)
        }

        if (event.currentTarget.files) {
            const fichierCharge = event.currentTarget.files[0]
            if (fichierCharge.type.includes('image/')) {
                setUrlImageProfil(URL.createObjectURL(fichierCharge))
            } else {
                setUrlImageProfil('')
                toast.error('Le fichier chargé n\'est pas une image')
            }
        } else {
            setUrlImageProfil('')
        }

    }

    const changerImageProfil = () => {
        if (cropProfil && imgProfilRef.current) {
            let image = imgProfilRef.current

            let canvas = document.createElement('canvas')
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const pixelRatio = window.devicePixelRatio;
            canvas.width = cropProfil.width * pixelRatio;
            canvas.height = cropProfil.height * pixelRatio;
            const ctx = canvas.getContext('2d');

            if (ctx != null) {
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = 'low';

                ctx.drawImage(
                    image,
                    cropProfil.x * scaleX,
                    cropProfil.y * scaleY,
                    cropProfil.width * scaleX,
                    cropProfil.height * scaleY,
                    0,
                    0,
                    cropProfil.width,
                    cropProfil.height,
                );
            }

            const dataUrl = canvas.toDataURL('image/webp', 0)

            if (dataUrl) {
                auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    const fetchPromise = fetch(`${process.env.REACT_APP_API_URL}/user/update/image_profil`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            new_image: dataUrl,
                        }),
                    }).catch((error) => {
                        toast.error(`Une erreur est survenue: (${error.code})`)
                    })

                    toast.promise(fetchPromise, {
                        loading: 'Chargement...',
                        success: 'Paramètre modifié.',
                        error: `Une erreur est survenue.`,
                    });
                })
            }
        }
    }

    async function lierCompteGithub() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    linkWithPopup(user, githubProvider).then((result) => {
                        toast("Compter lier avec success")
                        setGithubLinked(true)

                        const additionalInfo = getAdditionalUserInfo(result)!
                        if (additionalInfo) {
                            if (additionalInfo.profile) {
                                const profile = additionalInfo.profile
                                fetch(`${process.env.REACT_APP_API_URL}/user/sync-github`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'authorization': idToken
                                    },
                                    body: JSON.stringify({
                                        id_github: typeof (profile.id) == 'number' ? profile.id.toString() : undefined,
                                    })

                                })

                            }
                        }


                    }).catch((error) => {
                        toast.error(error)
                    });
                })
            }
        })

    }

    async function dissocierCompteGithub() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(true).then((idToken) => {
                    unlink(user, GithubAuthProvider.PROVIDER_ID).then(() => {
                        toast.success("Votre compte a été dissocié avec sussès!")

                        fetch(`${process.env.REACT_APP_API_URL}/user/unsync-github`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': idToken
                            }
                        })

                        setGithubLinked(false)
                    }).catch((error) => {
                        toast.error(error)
                    });
                })
            }
        })

    }

    return (
        <div className={styles.container_parametres}>
            <motion.div initial={{ x: "-15%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h1 className={'global_title'} id={styles["titleParametres"]}>Modifier Profil</h1>

                <div >
                    <h3 className={'global_subtitle'}>Compatibilité GitHub</h3>


                    {githubLinked == false ?
                        <div className={styles.div_github}>
                            <Button className={styles.bouton_github} onClick={() => lierCompteGithub()}>
                                <AiFillGithub className={styles.github_icon} />
                                <span id={styles["link"]} className={'link'}>
                                    Lier Compte GitHub
                                </span>
                            </Button>
                        </div>
                        :
                        <div className={styles.div_github}>
                            <Button className={styles.bouton_github} onClick={() => dissocierCompteGithub()}>
                                <AiFillGithub className={styles.github_icon} />
                                <span id={styles["link"]} className={'link'}>
                                    Dissocier Compte GitHub
                                </span>
                            </Button>
                        </div>


                    }

                </div>

                <div >
                    <h3 className={'global_subtitle'}>Modifier le courriel</h3>


                    <label className={'global_label'}>Nouveau courriel</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <label className={'global_label'}>Confirmez le courriel</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="email"
                        value={newEmailConfirmation}
                        onChange={(e) => setNewEmailConfirmation(e.target.value)}
                    />

                    <label className={'global_label'}>Mot de passe</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation || !newEmail.trim()}>
                            Modifier
                        </button>
                    </div>

                </div>
                <br />
                <hr className={styles.hr}></hr>
                <br />
                <div >
                    <h3 className={'global_subtitle'}>Modifier le nom d'affichage</h3>

                    <label className={'global_label'}>Nouveau nom d'affichage </label>
                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newNameAffichage}
                        onChange={(e) => setNewNameAffichage(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le nom d'affichage</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newNameAffichageConfirmation}
                        onChange={(e) => setNewNameAffichageConfirmation(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeNameAffichage()} disabled={newNameAffichage !== newNameAffichageConfirmation || !newNameAffichage.trim()}>
                            Modifier
                        </button>
                    </div>


                </div>

                <br />
                <hr className={styles.hr}></hr>
                <br />

                <div >
                    <h3 className={'global_subtitle'}>Modifier le nom </h3>
                    <label className={'global_label'}>Nouveau nom  </label>
                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le nom </label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newNameConfirmation}
                        onChange={(e) => setNewNameConfirmation(e.target.value)}
                    />

                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeName()} disabled={newName !== newNameConfirmation || !newName.trim()}>
                            Modifier
                        </button>
                    </div>

                </div>


                <br />
                <hr className={styles.hr}></hr>
                <br />

                <div>
                    <h3 className={'global_subtitle'}>Modifier le prenom </h3>
                    <label className={'global_label'}>Nouveau prenom </label>
                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newPrenom}
                        onChange={(e) => setNewPrenom(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le prenom </label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newPrenomConfirmation}
                        onChange={(e) => setNewPrenomConfirmation(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changePrenom()} disabled={newPrenom !== newPrenomConfirmation || !newPrenom.trim()}>
                            Modifier
                        </button>
                    </div>

                </div>

                <br />
                <hr className={styles.hr}></hr>
                <br />

                <div>
                    <h3 className={'global_subtitle'}>Modifier le Bio </h3>
                    <label className={'global_label'}>Nouveau Bio </label>
                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeBio()} disabled={!newBio.trim()}>
                            Modifier
                        </button>
                    </div>

                </div>

                <br />
                <hr className={styles.hr}></hr>
                <br />

                <div>
                    <h3 className={'global_subtitle'}>Modifier l'image de profil</h3>
                    <div className={styles.import_image}>
                        <input
                            className={''}
                            type={'file'}
                            accept={'image/*'}
                            onChange={onInputProfilLoad}
                        />

                        <div id={styles["conteneuurChoisirImg"]}>
                            <div id={styles["conteneurIcone"]}>
                                <FaRegFolderOpen size="40px" id={styles["icone"]} />
                            </div>

                            <label id={styles["custom-file-upload"]}>

                                <input className={''}
                                    type={'file'}
                                    accept={'image/*'}
                                    onChange={onInputProfilLoad}>
                                </input>
                                <i className={"fa fa-cloud-upload"}></i> Choisir une image
                            </label>

                        </div>



                        <br />
                        {urlImageProfil && (
                            <ReactCrop
                                className={styles.image_profil}
                                crop={cropProfil}
                                onChange={crop => setCropProfil(crop)}
                                aspect={1}
                                circularCrop={true}>
                                <img src={urlImageProfil} onLoad={onImageProfilLoad} />
                            </ReactCrop>
                        )
                        }
                        {urlImageProfil && (
                            <div id={styles["containerDiv"]}>
                                <button className={'global_selected_bouton'} onClick={() => changerImageProfil()}>
                                    Modifier
                                </button>
                            </div>
                        )
                        }

                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ModifierProfil;