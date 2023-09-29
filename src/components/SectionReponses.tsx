import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Post from "./Post";
import {TYPE_REPONSE} from "./Post";
import {useEffect, useState} from "react";

export interface SectionReponsesProps {
    idParent: string;
}

function SectionReponses(props: SectionReponsesProps) {
    const navigate = useNavigate();

    const [replies, setReplies] = useState<any[]>([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/replies/${props.idParent}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(reponse => reponse.json())
            .then(response => {
                let data = response;

                setReplies(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <h3>Commentaires</h3>
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
                        nombreLike={nombre_likes}
                        nombreDislike={nombre_dislikes}
                        nombrePartage={nombre_partages}
                        nombreCommentaire={nombre_commentaires}
                        isPostFullScreen={false}
                        type={TYPE_REPONSE} urlImageProfil={url_image_profil} 
                        userVote={vote} />
                        )
                })}
            </motion.div>
        </div>
    );
}

export default SectionReponses;
