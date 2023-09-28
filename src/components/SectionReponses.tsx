import {motion} from 'framer-motion';
import Post, {TYPE_REPONSE} from "./Post";
import {useEffect, useState} from "react";
import CommentaireForm from "./CommentaireForm";

export interface SectionReponsesProps {
    idParent: string;
}

function SectionReponses(props: SectionReponsesProps) {

    const [replies, setReplies] = useState<any[]>([])

    function ajouterNouvCommentaire(nouvCommentaire: any) {
        setReplies(nouvCommentaire.concat(replies));
        console.log(replies);
        console.log(nouvCommentaire);
    }

    useEffect(() => {
        fetch(`http://localhost:1111/replies/${props.idParent}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(reponse => reponse.json())
            .then(response => {
                setReplies(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <h3>Commentaires</h3>
                <CommentaireForm idParent={props.idParent} ajouterNouvCommentaire={ajouterNouvCommentaire}/>
                {replies.map(({
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
                                  nombre_commentaires
                              }) => {
                    return (
                        <Post idPost={id_post}
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
                              type={TYPE_REPONSE} />
                        )
                })}
            </motion.div>
        </div>
    );
}

export default SectionReponses;
