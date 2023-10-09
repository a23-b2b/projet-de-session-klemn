import { Link } from 'react-router-dom';
import styles from '../../styles/Post.module.css'

interface HeaderProps {
    date: string;
    nomAffichage: string;
    nomUtilisateur: string;
    urlImageProfil: string;
}

const PostHeader = (props: HeaderProps) => {

    const datePost = new Date(props.date)
    const datePostUTC = new Date(Date.UTC(datePost.getUTCFullYear(), datePost.getUTCMonth(), datePost.getUTCDate(), datePost.getUTCHours() - datePost.getTimezoneOffset() / 60, datePost.getUTCMinutes(), datePost.getUTCSeconds()))
    const datePostSeconds = Math.round(datePostUTC.getTime() / 1000)

    const dateNow = new Date()
    const dateNowUTC = new Date(dateNow.toISOString())
    const dateNowSeconds = Math.round(dateNowUTC.getTime()/ 1000)

    const timeDifference = dateNowSeconds - datePostSeconds
    console.log(props.urlImageProfil)
    return (
        <div className={styles.header}>

            <div className={styles.header_content}>

                <Link to={`/u/${props.nomUtilisateur}`}>
                    <img className={styles.image_profil} src={props.urlImageProfil} />
                </Link>

                <Link to={`/u/${props.nomUtilisateur}`} className={styles.user_info}>
                    <p className={styles.display_name}>{props.nomAffichage}</p>
                    <p className={styles.username}>@{props.nomUtilisateur}</p>
                </Link>

            </div>

            <p className={styles.date}>{props.date}</p>
        </div>
    )
}

export default PostHeader;