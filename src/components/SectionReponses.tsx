import { AnimatePresence, motion } from 'framer-motion';
import Post, { TYPE_REPONSE } from "./Post";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommentaireForm from "./CommentaireForm";

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
        fetch(`http://localhost:1111/replies/${props.idParent}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(reponse => reponse.json())
            .then(response => {
                setReplies(response)

                // WORKAROUND pour le bug qui fait que le contenu saute par dessus le post
                setTimeout(function () {
                    setLoading(false)
                }, 325);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const RepliesContent = () => {
        if (replies.length > 0) {
            return (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {
                        replies.map(({
                            id_post,
                            id_compte,
                            date_publication,
                            nom_affichage,
                            nom_utilisateur,
                            titre,
                            contenu,
                            nombre_likes,
                            nombre_dislikes,
                            nombre_partages,
                            nombre_commentaires,
                            url_image_profil
                        }) => {
                            return (
                                <Post
                                    idPost={id_post}
                                    idCompte={id_compte}
                                    date={date_publication}
                                    nomAffichage={nom_affichage}
                                    nomUtilisateur={nom_utilisateur}
                                    titre={titre}
                                    contenu={contenu}
                                    nombreLike={nombre_likes}
                                    nombreDislike={nombre_dislikes}
                                    nombrePartage={nombre_partages}
                                    nombreCommentaire={nombre_commentaires}
                                    isPostFullScreen={false}
                                    type={TYPE_REPONSE}
                                    urlImageProfil={url_image_profil} />
                            )
                        })
                    }
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
        style={{ overflow: "hidden"}}
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
                {loading ? '' : <RepliesContent />}
            </AnimatePresence>

        </motion.div>
    );
}

export default SectionReponses;
