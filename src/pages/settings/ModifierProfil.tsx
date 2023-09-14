import { useEffect, useState } from 'react';
import styles from '../../styles/ModifierProfil.module.css'
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

function ModifierProfil() {
    return (
            <h1>Modifier Profil</h1>
    );
}

export default ModifierProfil;