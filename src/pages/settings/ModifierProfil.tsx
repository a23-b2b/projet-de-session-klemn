import {useRef, useState} from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import ReactCrop, {centerCrop, convertToPixelCrop, Crop, makeAspectCrop} from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'




function ModifierProfil() {
    const [firebaseLoading, setFirebaseLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

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

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/changer_nom_affichage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_name_affichage: newNameAffichage,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }


    const changeName = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/changer_nom', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_name: newName,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }



    const changePrenom = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/changer_prenom', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_prenom: newPrenom,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
    }



    const changeBio = () => {

        let password = prompt('Pour continuer, entrez votre mot de passe');

        let user = auth.currentUser;

        if (user && user.email && password) {
            var credential = EmailAuthProvider.credential(
                user.email,
                password
            );

            reauthenticateWithCredential(user, credential).then((user) => {
                fetch(process.env.REACT_APP_API_URL + '/changer_bio', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        new_bio: newBio,
                        id_compte: user.user.uid
                    }),
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                toast.error(`Une erreur est survenue! (${error.code})`)
                // An error ocurred
                // ...
            });

        }
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
                ctx.imageSmoothingQuality = 'high';

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

            console.log(cropProfil)
            console.log(canvas.toDataURL())
        }

    }

    return (
        <motion.div className={'global_conteneur_parametres'} initial={{ x: "-15%", opacity: 0 }} animate={{ x: "5%", opacity: 1 }}>
            <h1 className={'global_title'} id={styles["titleParametres"]}>Modifier Profil</h1>



            <div >
                <h3 className={'global_subtitle'}>Modifier le courriel</h3>


                <label className={'global_input_field_label'}>Nouveau courriel</label>

                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                />

                <label className={'global_input_field_label'}>Confirmez le courriel</label>


                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    type="email"
                    onChange={(e) => setNewEmailConfirmation(e.target.value)}
                />
                <div id={styles["containerDiv"]}>
                    <button className={'global_bouton'} onClick={() => changeEmail()} disabled={newEmail !== newEmailConfirmation}>
                        Modifier
                    </button>
                </div>

            </div>
            <br />
            <hr className={styles.hr}></hr>
            <br />
            <div >
                <h3 className={'global_subtitle'}>Modifier le nom d'affichage</h3>

                <label className={'global_input_field_label'}>Nouveau nom d'affichage </label>
                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewNameAffichage(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le nom d'affichage</label>

                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewNameAffichageConfirmation(e.target.value)}
                />
                <div id={styles["containerDiv"]}>
                    <button className={'global_bouton'} onClick={() => changeNameAffichage()} disabled={newNameAffichage !== newNameAffichageConfirmation}>
                        Modifier
                    </button>
                </div>


            </div>

            <br />
            <hr className={styles.hr}></hr>
            <br />

            <div >
                <h3 className={'global_subtitle'}>Modifier le nom </h3>
                <label className={'global_input_field_label'}>Nouveau nom  </label>
                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le nom </label>

                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewNameConfirmation(e.target.value)}
                />

                <div id={styles["containerDiv"]}>
                    <button className={'global_bouton'} onClick={() => changeName()} disabled={newName !== newNameConfirmation}>
                        Modifier
                    </button>
                </div>

            </div>


            <br />
            <hr className={styles.hr}></hr>
            <br />

            <div>
                <h3 className={'global_subtitle'}>Modifier le prenom </h3>
                <label className={'global_input_field_label'}>Nouveau prenom </label>
                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewPrenom(e.target.value)}
                />
                <label className={'global_input_field_label'}>Confirmez le prenom </label>

                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewPrenomConfirmation(e.target.value)}
                />
                <div id={styles["containerDiv"]}>
                    <button className={'global_bouton'} onClick={() => changePrenom()} disabled={newPrenom !== newPrenomConfirmation}>
                        Modifier
                    </button>
                </div>

            </div>

            <br />
            <hr className={styles.hr}></hr>
            <br />

            <div>
                <h3 className={'global_subtitle'}>Modifier le Bio </h3>
                <label className={'global_input_field_label'}>Nouveau Bio </label>
                <input
                    id={styles["input"]}
                    className={'global_input_field'}
                    onChange={(e) => setNewBio(e.target.value)}
                />
                <div id={styles["containerDiv"]}>
                    <button className={'global_bouton'} onClick={() => changeBio()} disabled={newBio === ""}>
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
                        type={'file'}
                        accept={'image/'}
                        onChange={event => {
                            if (urlImageProfil) {
                                URL.revokeObjectURL(urlImageProfil)
                            }
                            setUrlImageProfil(event.target.files ? URL.createObjectURL(event.target.files[0]) : '')
                        }}
                    />
                    <br/>
                    {urlImageProfil && (
                        <ReactCrop crop={cropProfil}
                                   onChange={crop => setCropProfil(crop)}
                                   aspect={1}
                                   circularCrop={true}>
                            <img src={urlImageProfil} onLoad={onImageProfilLoad}/>
                        </ReactCrop>
                    )
                    }
                    {urlImageProfil && (
                        <button className={'global_bouton'} onClick={() => changerImageProfil()}>
                            Modifier
                        </button>
                    )
                    }

                </div>
            </div>
        </motion.div>
    );
}

export default ModifierProfil;