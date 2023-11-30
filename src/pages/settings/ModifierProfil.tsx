import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/SettingsPanel.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, GithubAuthProvider, getAdditionalUserInfo, linkWithPopup, onAuthStateChanged, reauthenticateWithCredential, unlink, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import ReactCrop, { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import { FaRegFolderOpen } from 'react-icons/fa6';
import { Button } from '@chakra-ui/button';
import { AiFillGithub } from 'react-icons/ai';




function ModifierProfil() {
    const [newEmail, setNewEmail] = useState('');
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
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/display_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name_affichage: newNameAffichage,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeName = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/nom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_name: newName,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changePrenom = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/prenom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_prenom: newPrenom,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
            }).catch((error) => {
                toast.error(`Une erreur est survenue: (${error.code})`)
            })
        })
    }

    const changeBio = () => {
        auth.currentUser?.getIdToken(/* forceRefresh */ true).then((idToken) => {
            fetch(process.env.REACT_APP_API_URL + '/user/update/bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': idToken
                },
                body: JSON.stringify({
                    new_bio: newBio,
                }),
            }).then(response => response.json()).then(response => {
                toast.success('Paramètre modifié.');
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
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <label className={'global_label'}>Confirmez le courriel</label>


                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        type="email"
                        onChange={(e) => setNewEmailConfirmation(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation}>
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
                        onChange={(e) => setNewNameAffichage(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le nom d'affichage</label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        onChange={(e) => setNewNameAffichageConfirmation(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeNameAffichage()} disabled={newNameAffichage !== newNameAffichageConfirmation}>
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
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le nom </label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        onChange={(e) => setNewNameConfirmation(e.target.value)}
                    />

                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeName()} disabled={newName !== newNameConfirmation}>
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
                        onChange={(e) => setNewPrenom(e.target.value)}
                    />
                    <label className={'global_label'}>Confirmez le prenom </label>

                    <input
                        id={styles["input"]}
                        className={'global_input_field'}
                        onChange={(e) => setNewPrenomConfirmation(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changePrenom()} disabled={newPrenom !== newPrenomConfirmation}>
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
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                    <div id={styles["containerDiv"]}>
                        <button className={'global_selected_bouton'} onClick={() => changeBio()} disabled={newBio === ""}>
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