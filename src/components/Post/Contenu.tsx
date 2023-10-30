import { useEffect, useState } from "react";
import styles from '../../styles/Post.module.css'
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";


interface ContentProps {
    titre?: string;
    contenu: string;
    idPost: string;
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

            {
                props.isPostFullScreen ?

                    <div className={styles.conteneurDiv}>
                        <h2 className={'global_title'}>
                            {props.titre}
                        </h2>
                        
                    </div>

                    :

                    <div className={styles.conteneurDiv}>
                        
                        <h2>
                            {props.titre}
                        </h2>
                        
                    </div>

            }




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

export default PostContent;