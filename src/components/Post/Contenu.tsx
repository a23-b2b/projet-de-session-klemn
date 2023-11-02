import { useEffect, useState } from "react";
import styles from '../../styles/Post.module.css'
import { AnimatePresence, motion } from "framer-motion";
import MarkdownCode from "../MarkdownCode";
import { Link } from "react-router-dom";

interface ContentProps {
    titre: string;
    contenu: string;
    idPost: string;
    isPostFullScreen: Boolean;
    estMarkdown: Boolean;
}

const PostContent = (props: ContentProps) => {
    const [postContent, setPostContent] = useState('')
    const [isPostExpanded, setIsPostExpanded] = useState(false);

    let truncatedPostContent = props.contenu.slice(0, 247)
    console.log(truncatedPostContent)
    if (props.contenu.length > 247 && !isPostExpanded) truncatedPostContent += '...'

    let contentAfterTruncatedPostContent = props.contenu.slice(247)

    const postTruncated = props.contenu.length > 247
    console.log(props.contenu)

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
    // if estMarkdown CodeMarkdown avec text sinon le reste
    /*{props.estMarkdown && 
           < MarkdownCode c={props.contenu}/>
        }
        {!props.estMarkdown && 
            props.contenu
        }*/
    return (<>
        
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
                        <Link to={`/p/${props.idPost}`} className={styles.titre}>
                            <h2>
                                {props.titre}
                            </h2>
                        </Link>
                    </div>

            }

            <motion.div>   
                <div className={styles.contenu} onClick={() => handleExpandContent()}>
                    {!isPostExpanded &&  (       
                            props.estMarkdown ? <MarkdownCode c= {truncatedPostContent}/> : <div>{truncatedPostContent}</div>                  
                    )}
                                    
                    <AnimatePresence>
                        {props.isPostFullScreen && (
                            
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                {
                                    props.estMarkdown ? <MarkdownCode c={props.contenu}/> : <div>{props.contenu}</div>
                                }
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
        </>
    )
    
}

export default PostContent;