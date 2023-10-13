import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from '../../styles/QuotePostModal.module.css'
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import toast from 'react-hot-toast';


interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function QuotePostModal(props: Props) {
    const [scopeModal, animateModal] = useAnimate()
    const [scopeBackdrop, animateBackdrop] = useAnimate()
    const [shouldModalBeDisplayed, setShouldModalBeDisplayed] = useState(false)

    if (props.isModalOpen) {

    }

    useEffect(() => {
        if (props.isModalOpen) {
            openModal()
        }
    }, [props.isModalOpen])


    function openModal() {
        if (props.isModalOpen) {
            toast.success("HELLO WORLD")
            setShouldModalBeDisplayed(true)
        }

        // animateModal(scopeModal.current, {
        //     scale: 0.7,
        //     opacity: 0
        // }, {
        //     duration: 0.15,
        //     ease: "anticipate"
        // }).then(() => {
        //     animateModal(scopeModal.current, {
        //         scale: 1,
        //         opacity: 1,
        //     }, {
        //         duration: 0.15,
        //         ease: "anticipate"
        //     })
        // })
    }

    function afterOpenModal() {
        // toast.success("hello")
    }

    function closeModal() {
        toast.success("BYEBYE WORLD")
        setShouldModalBeDisplayed(false)
        props.setIsModalOpen(false)
    }

    return (
        <AnimatePresence> {shouldModalBeDisplayed &&
            <motion.div
                className={styles.window}
                initial={{ backdropFilter: 'blur(0)' }}
                animate={{ backdropFilter: 'blur(4px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'circOut' }}>
                <motion.div
                    className={styles.modal}
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

                    <h1>MON MODAL</h1>
                    <button onClick={closeModal}>fermer</button>
                </motion.div>
            </motion.div>
        } </AnimatePresence>
    );
}

export default QuotePostModal;