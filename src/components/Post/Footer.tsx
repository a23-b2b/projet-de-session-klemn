import { BsFillReplyAllFill } from 'react-icons/bs';
import styles from '../../styles/Post.module.css'
import { AiFillDislike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import SectionReponses from '../SectionReponses';
import { useState } from 'react';

interface FooterProps {
    idPost: string;
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
                    {isReponsesOpen ? <SectionReponses  idParent={props.idPost}/> : ''}
                </AnimatePresence>)}

        </div>
    )
}

export default PostFooter;