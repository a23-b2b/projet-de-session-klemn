import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import CommentaireForm from './CommentaireForm';
import { AnimatePresence, motion } from 'framer-motion';
import Post, { TYPE_REPONSE } from "./Post";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Chargement from './EcranChargement';
import toast from 'react-hot-toast';

export interface SectionReponsesProps {
    idParent: string;
    setNombreCommentaire?: Dispatch<SetStateAction<number>>;
}

function SectionReponses(props: SectionReponsesProps) {

    const [replies, setReplies] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    function ajouterNouvCommentaire(nouvCommentaire: any) {
        setReplies(nouvCommentaire.concat(replies));
        if (props.setNombreCommentaire) props.setNombreCommentaire(replies.length + 1)
    }

    useEffect(() => {
        setLoading(true)

        onAuthStateChanged(auth, (user) => {
            fetch(`${process.env.REACT_APP_API_URL}/post/${props.idParent}/replies`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: user?.uid || ""
                }
            }).then(reponse => reponse.json())
                .then(response => {
                    setReplies(response)

                    // WORKAROUND pour le bug qui fait que le contenu saute par dessus le post
                    setTimeout(function () {
                        setLoading(false)
                    }, 325);
                })
                .catch((error) => {
                    toast.error(error)
                })
        })
    }, [props.idParent])

    const RepliesContent = () => {
        if (replies.length > 0) {
            return (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <h3>Commentaires</h3>
                    {replies.map(({
                        id_post,
                        id_compte,
                        id_type_post,
                        date_publication,
                        nom_affichage,
                        nom_utilisateur,
                        titre,
                        contenu,
                        est_markdown,
                        nombre_likes,
                        nombre_dislikes,
                        nombre_partages,
                        nombre_commentaires,
                        url_image_profil,
                        vote
                    }) => {
                        return (
                            <Post idPost={id_post}
                                idCompte={id_compte}
                                date={date_publication}
                                nomAffichage={nom_affichage}
                                nomUtilisateur={nom_utilisateur}
                                titre={titre}
                                contenu={contenu}
                                estMarkdown={est_markdown}
                                nombreLike={nombre_likes}
                                nombreDislike={nombre_dislikes}
                                nombrePartage={nombre_partages}
                                nombreCommentaire={nombre_commentaires}
                                isPostFullScreen={false}
                                type={id_type_post}
                                urlImageProfil={url_image_profil}
                                userVote={vote} />
                        )
                    })}
                </motion.div>
            )
        }

        return (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <h2>Aucun commentaire.</h2>
                <h4>Soyez le premier utilisateur a commenter!</h4>
            </motion.div>
        )

    }

    return (
        <motion.div
            style={{ overflow: "hidden" }}
            initial={{
                height: 0,
                opacity: 0,
                scale: 0.8,
                y: -50,
            }}
            animate={{
                height: 'auto',
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            exit={{
                height: 0,
                opacity: 0,
                scale: 0.6,
                y: -20,
            }}>
            <h3>Commentaires</h3>
            <CommentaireForm idParent={props.idParent} ajouterNouvCommentaire={ajouterNouvCommentaire} />

            <AnimatePresence>
                {loading ? <Chargement /> : <RepliesContent />}
            </AnimatePresence>

        </motion.div>
    );
}

export default SectionReponses;
