import { BsFillReplyAllFill } from 'react-icons/bs';
import styles from '../../styles/Post.module.css'
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import SectionReponses from '../SectionReponses';
import VoteWidget from './voteWidget';
import { useState } from 'react';
import { Menu, MenuButton, MenuDivider, MenuHeader, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/transitions/slide.css'
import { FaQuoteRight, FaRetweet } from 'react-icons/fa6';
import { LuCopy } from 'react-icons/lu'
import toast from 'react-hot-toast';
import QuotePostModal from './QuotePostModal';
import { auth } from '../../firebase';

interface FooterProps {
    id_compte?: string;
    parent_est_resolu?: boolean;

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
    const [isQuotePostModalOpen, setIsQuotePostModalOpen] = useState(false);

    function handleShareItemClick(item: string) {
        switch (item) {
            case "quote":
                setIsQuotePostModalOpen(true)
                break;

            case "repost":
                handleBoostPost()
                break;

            case "copy_url":
                navigator.clipboard.writeText(`${window.location.origin}/p/${props.idPost}`)
                toast.success("Contenu copié dans le presse-papier.")
                break;

            default:
                break;
        }
    }

    async function handleBoostPost() {
        // const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
        const utilisateur = auth.currentUser;
        if (utilisateur) {
            utilisateur.getIdToken(/* forceRefresh */ true)
                .then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/post/${props.idPost}/boost`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': idToken
                        },
                        body: JSON.stringify({
                            contenu: `boosted_id=${props.idPost}`
                        }),
                    }).then(response => response.json())
                        .then(response => {
                            toast.success('La publication à été partagée!');

                        }).catch((error) => {
                            toast.error('Une erreur est survenue');
                        })
                })
        }
    }

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


                <Menu menuButton={
                    <div className={styles.bouton_interraction} id={styles.bouton_interraction_partage}>
                        <AiOutlineShareAlt className={styles.icone} id={styles.icone_partage} />
                        <span className={styles.interraction_count}>{props.nombrePartage}</span>
                    </div>
                }

                    transition={true}
                    menuClassName={styles.share_menu}
                    onItemClick={(e) => handleShareItemClick(e.value)}>

                    <MenuItem value={'quote'} className={styles.share_menu_item}><FaQuoteRight className={styles.share_menu_icon} /><span>Citer</span></MenuItem>
                    <MenuItem value={'repost'} className={styles.share_menu_item}><FaRetweet className={styles.share_menu_icon} /><span>Republier</span></MenuItem>
                    <MenuDivider />
                    <MenuItem value={'copy_url'} className={styles.share_menu_item}><LuCopy className={styles.share_menu_icon} /><span>Copier le lien</span></MenuItem>
                </Menu>
            </div>

            <QuotePostModal quotedPostId={props.idPost} isModalOpen={isQuotePostModalOpen} setIsModalOpen={setIsQuotePostModalOpen} />

            {!props.isPostFullScreen && (
                <AnimatePresence>
                    
                    {isReponsesOpen ? 
                        <SectionReponses 
                            idParent={props.idPost} 
                            question_parente_est_resolue={props.parent_est_resolu} 
                            setNombreCommentaire={setNombreReponses} /> : ''}
                </AnimatePresence>)}
        </div>
    )
}

export default PostFooter;