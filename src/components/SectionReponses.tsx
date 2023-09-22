import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Reponse from './Reponse';



function SectionReponses() {
    const navigate = useNavigate();

    return (
        <div>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <h3>Commentaires</h3>
                <Reponse/>
            </motion.div>
        </div>
    );
}

export default SectionReponses;
