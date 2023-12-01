import styles from '../../styles/Post.module.css'
import PostHeader from './Header';
import PostContent from './Contenu';
import PostFooter from './Footer';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export interface QuestionProp {
    idPost: string;
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    estMarkdown: Boolean;
    estModifie: Boolean;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    urlImageProfil: string;
    userVote: number;

    idMeilleureReponse?: string;
    statutReponse?: boolean;

    isPostFullScreen: Boolean;
}

function PosteQuestion(props: QuestionProp) {

    return (
        <div className={'global_container_3'} id={styles["conteneur_post"]}>
            <PostHeader
                date={props.date}
                idPost={props.idPost}
                idCompte={props.idCompte}
                nomAffichage={props.nomAffichage}
                nomUtilisateur={props.nomUtilisateur} 
                urlImageProfil={props.urlImageProfil}
                isDeleted={false}
                estModifie={props.estModifie} 
                contenu={props.contenu}/>

            <PostContent
                titre={props.titre}
                idPost={props.idPost}
                contenu={props.contenu}
                estMarkdown={props.estMarkdown}
                isPostFullScreen={props.isPostFullScreen} />

            { props.statutReponse !== undefined ? <p>Résolu: {props.statutReponse.toString()}</p> : null }

            { props.idMeilleureReponse ? (
                <Link to={`/p/${props.idMeilleureReponse}`}>
                    <p>Meilleure Réponse: {props.idMeilleureReponse}</p>            
                </Link>
            )
            :
                null
            }

            <PostFooter
                idPost={props.idPost}
                id_compte={props.idCompte}
                parent_est_resolu={props.statutReponse}
                nombreLike={props.nombreLike}
                nombreDislike={props.nombreDislike}
                nombrePartage={props.nombrePartage}
                nombreCommentaire={props.nombreCommentaire}
                isPostFullScreen={props.isPostFullScreen}
                userVote={props.userVote}
            />
        </div>
    );
}

export default PosteQuestion;