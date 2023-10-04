import { BsFillReplyAllFill } from 'react-icons/bs';
import styles from '../../styles/Post.module.css'
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import SectionReponses from '../SectionReponses';
import VoteWidget from './voteWidget';
import { Dispatch, SetStateAction, useState } from 'react';

interface FooterProps {
    idPost: string;
    nombreLike: number;
    nombreDislike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    isPostFullScreen: Boolean;
    userVote: number;
}

const PostFooter = (props: FooterProps) => {
    const [isReponsesOpen, setIsReponsesOpen] = useState(false);
    const [nombreReponses, setNombreReponses] = useState(props.nombreCommentaire)

    return (
        <div>
            <div className={styles.footer}>

                <div className={styles.bouton_interraction} id={styles.bouton_interraction_reply} onClick={() => setIsReponsesOpen(!isReponsesOpen)}>
                    <BsFillReplyAllFill className={styles.icone} id={styles.icone_reply} />
                    <span className={styles.interraction_count}>{nombreReponses}</span>
                </div>

                <VoteWidget
                    idPost={props.idPost}
                    nombreLike={props.nombreLike}
                    nombreDislike={props.nombreDislike}
                    userVote={props.userVote} />

                <div className={styles.bouton_interraction} id={styles.bouton_interraction_partage}>
                    <AiOutlineShareAlt className={styles.icone} id={styles.icone_partage} />
                    <span className={styles.interraction_count}>{props.nombrePartage}</span>
                </div>
            </div>

            {!props.isPostFullScreen && (
                <AnimatePresence>
                    {isReponsesOpen ? <SectionReponses idParent={props.idPost} setNombreCommentaire={setNombreReponses}/> : ''}
                </AnimatePresence>)}

        </div>
    )
}

export default PostFooter;