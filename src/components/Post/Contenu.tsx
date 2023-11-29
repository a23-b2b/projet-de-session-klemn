import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Post.module.css'
import { Link, useNavigate } from "react-router-dom";
import { BsArrowBarDown } from 'react-icons/bs'
import { AnimatePresence, motion } from "framer-motion";
import MarkdownCode from "../MarkdownCode";
import "../../styles/global.css"

interface ContentProps {
    titre: string;
    contenu: string;
    idPost: string;
    isPostFullScreen: Boolean;
    estMarkdown: Boolean;
}

const PostContent = (props: ContentProps) => {
    const contentRef = useRef<HTMLInputElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const maxHeight = 150;

    const showFullContent = contentHeight <= maxHeight || props.isPostFullScreen;
    const displayShowMoreButton = !showFullContent && !props.isPostFullScreen

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight)
        }
    }, [contentHeight]);

    return (
        <div className={styles.contenu} ref={contentRef}>
            {props.isPostFullScreen ?
                <h2 className={styles.titre}>
                    {props.titre}
                </h2>

                :

                <Link to={`/p/${props.idPost}`} className={styles.titre}>
                    <h2>
                        {props.titre}
                    </h2>
                </Link>
            }

            {showFullContent && !displayShowMoreButton &&

                <MarkdownCode c={props.contenu} />
            }

            {!showFullContent &&
                <div style={{ maxHeight: `${maxHeight}px`, overflow: "hidden" }}>
                    <MarkdownCode c={props.contenu} />
                </div>
            }


            {displayShowMoreButton &&
                <Link to={`/p/${props.idPost}`} style={{textDecoration: "none"}}>
                    <button className={`global_selected_bouton ${styles.bouton_voir_plus}`}>
                        <BsArrowBarDown style={{transform: "translateX(-10px)"}}/> Voir plus
                    </button>
                </Link>

            }
        </div>
    )

}

export default PostContent;