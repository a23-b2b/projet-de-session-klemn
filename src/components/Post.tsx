import styles from '../styles/Post.module.css'
import { AnimatePresence, animate, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PosteBlogue from './PosteBlogue';
import SectionReponses from './SectionReponses';
import { BsFillReplyAllFill } from 'react-icons/bs';
import { AiFillDislike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai';

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

const PostContent = (props: ContentProps) => {
    const [postContent, setPostContent] = useState('')
    const [isPostExpanded, setIsPostExpanded] = useState(false);

    let truncatedPostContent = props.contenu.slice(0, 247)

    if (props.contenu.length > 247 && !isPostExpanded) truncatedPostContent += '...'

    let contentAfterTruncatedPostContent = props.contenu.slice(247)

    const postTruncated = props.contenu.length > 247


    useEffect(() => {
        if (props.isPostFullScreen) setIsPostExpanded(true)
        setPostContent(truncatedPostContent)
    }, [])


    function handleExpandContent() {
        // if (!props.isPostFullScreen && postTruncated) {
        //     setIsPostExpanded(!isPostExpanded)

        //     if (isPostExpanded) {
        //         setPostContent(props.contenu)
        //     } else {
        //         setPostContent(truncatedPostContent)
        //     }
        // }

        if (!props.isPostFullScreen) {
            if (postTruncated) {
                setIsPostExpanded(!isPostExpanded);
            }
        }
    }

    return (
        <div className={styles.contenu}>
            <h2>{props.titre}</h2>


            <motion.div>
                {/* <p className={styles.contenu}>{props.contenu.length > 250 && !props.isContentExpanded ? <motion.div layout>{`${props.contenu.slice(0, 247)}...`} </motion.div>: <motion.div layout>{props.contenu}</motion.div>}</p> */}
                {/* <p className={styles.contenu}>{props.contenu.length > 250 && !props.isContentExpanded ? `${props.contenu.slice(0, 247)}...` : props.contenu}</p> */}
                {/* {props.isContentExpanded ? <p className={styles.contenu}>{props.contenu}</p> : <p className={styles.contenu}>{truncatedPostContent}</p>} */}

                <div className={styles.contenu} onClick={() => handleExpandContent()}>


                    {/* {postContent} */}

                    {/* <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                        <p className={styles.contenu}>{props.contenu}</p>
                    </div> */}

                    {/* <AnimatePresence>
                        {!isPostExpanded && (
                            <motion.div>
                                {truncatedPostContent}
                            </motion.div>
                        )}
                    </AnimatePresence> */}

                    {!isPostExpanded && (
                        <p>{truncatedPostContent}</p>
                    )}

                    <AnimatePresence>
                        {isPostExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                {props.contenu}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* <AnimatePresence>
                    {props.isContentExpanded && (
                        // <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                        //     <p className={styles.contenu}>{props.contenu}</p>
                        // </div>


                        <motion.div initial={{ height: 'auto', opacity: 1 }} animate={{ maxHeight: '200px', opacity: 1 }} exit={{ height: 'auto', opacity: 1 }} style={{ overflow: "hidden" }}>
                            <p className={styles.contenu}>{props.contenu}</p>
                        </motion.div>
                    )}
                </AnimatePresence> */}
            </motion.div>
        </div>
    )

}

interface FooterProps {
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    isPostFullScreen: Boolean;
}

const PostFooter = (props: FooterProps) => {
    const [isReponsesOpen, setIsReponsesOpen] = useState(false);

    return (
        <div>
            <div className={styles.footer}>

                <div className={styles.bouton_interraction} id={styles.bouton_interraction_reply} onClick={() => setIsReponsesOpen(!isReponsesOpen)}>
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

            {!props.isPostFullScreen && (
                <AnimatePresence>
                    {isReponsesOpen ? <SectionReponses /> : ''}
                </AnimatePresence>)}

        </div>
    )
}

interface Props {
    idPost: string;
    date: string;
    nomAffichage: string,
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    idCompte: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;

    isPostFullScreen: Boolean;

    type: number;

    // props optionnels
    statutReponse?: Boolean;
    idMeilleureReponse?: string;
}

function Post(props: Props) {

    return (
        <div className={styles.container}>
            {props.type == 1 && (
                <>
                    {/* <AnimatePresence> */}


                    <PostHeader date={props.date} nomAffichage={props.nomAffichage} nomUtilisateur={props.nomUtilisateur} />

                    <PostContent titre={props.titre} contenu={props.contenu} isPostFullScreen={props.isPostFullScreen} />


                    <PostFooter
                        nombreLike={props.nombreLike}
                        nombreDislike={props.nombreDislike}
                        nombrePartage={props.nombrePartage}
                        nombreCommentaire={props.nombreCommentaire}
                        isPostFullScreen={props.isPostFullScreen}
                    />
                </>
            )
            }
        </div >
    );
}

export default Post;