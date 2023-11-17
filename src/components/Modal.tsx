import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css'
import { AnimatePresence, color, motion } from 'framer-motion';

import { GrFormClose } from 'react-icons/gr'


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;

    children: React.ReactNode;
}

function Modal(props: Props) {

    const [shouldModalBeDisplayed, setShouldModalBeDisplayed] = useState(false)

    useEffect(() => {
        if (props.isModalOpen) {
            openModal()
        }
    }, [props.isModalOpen])


    function openModal() {
        setShouldModalBeDisplayed(true)
    }

    function closeModal() {
        setShouldModalBeDisplayed(false)
        props.setIsModalOpen(false)
    }

    return (
        <AnimatePresence> {shouldModalBeDisplayed &&
            <motion.div
                className={styles.window}
                initial={{ backdropFilter: 'blur(0)' }}
                animate={{ backdropFilter: 'blur(4px) saturate(50%) brightness(50%)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'circOut' }}>
                <motion.div 
                    id={styles["modal"]}
                    className={"global_conteneur_modal"}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { duration: 0.4, ease: "circOut", opacity: { duration: 0.2 } }
                    }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.15, ease: "linear" }
                    }}>

                    <button className={styles.bouton_fermer} onClick={closeModal}><GrFormClose className={styles.bouton_fermer_icone}/></button>

                    {props.children}

                </motion.div>
            </motion.div>
        } </AnimatePresence>
    );
}

export default Modal;