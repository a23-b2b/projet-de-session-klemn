import { Link } from 'react-router-dom';
import user from '../images/user.png';
import styles from '../styles/Post.module.css'
import { AiFillDislike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFillReplyAllFill } from 'react-icons/bs'

export interface BlogueProp {
    idPost: string;
    date: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    type: string;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
}

function PosteBlogue(props: BlogueProp) {
    return (
        <div className={styles.container}>

            <div className={styles.header}>

                <div className={styles.header_content}>

                    <img className={styles.image_profil} src='https://fr.web.img6.acsta.net/medias/nmedia/18/71/84/20/19146888.jpg' />

                    <div className={styles.user_info}>
                        <p className={styles.display_name}>{props.nom} {props.prenom}</p>
                        <p className={styles.username}>@{props.nomUtilisateur}</p>
                    </div>

                </div>

                <p className={styles.date}>{props.date}</p>
            </div>

            <div className={styles.contenu}>
                <div>
                    <Link className={styles.titre} to={`/p/${props.idPost}`}>
                        <h2>{props.titre}</h2>
                    </Link>
                </div>

                <div>
                    <p className={styles.description}>{props.contenu.length > 250 ? `${props.contenu.slice(0, 247)}...` : props.contenu}</p>
                </div>

            </div>

            <div className={styles.footer}>

                <div className={styles.bouton_interraction} id={styles.bouton_interraction_reply}>
                    <BsFillReplyAllFill className={styles.icone} id={styles.icone_reply} />
                    <span className={styles.interraction_count}>{props.nombreCommentaire}</span>
                </div>

                <div className={styles.like_dislike_container}>
                    <div className={styles.bouton_interraction} id={styles.bouton_interraction_like}>
                        <AiFillLike className={styles.icone} id={styles.icone_like} />
                    </div>

                    <span className={styles.interraction_count}>{props.nombreLike - props.nombreDislike}</span>


                    <div className={styles.bouton_interraction} id={styles.bouton_interraction_dislike}>
                        <AiFillDislike className={styles.icone} id={styles.icone_dislike} />
                    </div>
                </div>


                <div className={styles.bouton_interraction} id={styles.bouton_interraction_partage}>
                    <AiOutlineShareAlt className={styles.icone} id={styles.icone_partage} />
                    <span className={styles.interraction_count}>{props.nombrePartage}</span>
                </div>
            </div>
        </div>
    );
}

export default PosteBlogue;