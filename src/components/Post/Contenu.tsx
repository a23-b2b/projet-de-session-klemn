import { useEffect, useRef, useState } from "react";
import styles from '../../styles/Post.module.css'
import { Link, useNavigate } from "react-router-dom";
import { BsArrowBarDown } from 'react-icons/bs'


interface ContentProps {
    titre?: string;
    contenu: string;
    idPost: string;
    isPostFullScreen: Boolean;
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
            console.log('contentHeight', contentHeight)
        }
    }, [contentHeight]);

    return (
        <div className={styles.contenu}>

            {
                props.isPostFullScreen ?

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
                <p>
                    {props.contenu}
                </p>
            }

            {!showFullContent &&
                <div style={{ maxHeight: `${maxHeight}px`, overflow: "hidden" }}>
                    {props.contenu}
                </div>
            }


            {displayShowMoreButton &&
                <Link to={`/p/${props.idPost}`}>
                    <button>
                        <BsArrowBarDown /> Voir plus
                    </button>
                </Link>

            }
        </div>
    )

}

export default PostContent;