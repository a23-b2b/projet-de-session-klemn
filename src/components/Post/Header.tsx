import styles from '../../styles/Post.module.css'

interface HeaderProps {
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
}

const PostHeader = (props: HeaderProps) => {
    return (
        <div className={styles.header}>

            <div className={styles.header_content}>

                <img className={styles.image_profil} src='https://fr.web.img6.acsta.net/medias/nmedia/18/71/84/20/19146888.jpg' />

                <div className={styles.user_info}>
                    <p className={styles.display_name}>{props.nomAffichage}</p>
                    <p className={styles.username}>@{props.nomUtilisateur}</p>
                </div>

            </div>

            <p className={styles.date}>{props.date}</p>
        </div>
    )
}

interface ContentProps {
    titre?: string;
    contenu: string;
    isPostFullScreen: Boolean;
}

export default PostHeader;