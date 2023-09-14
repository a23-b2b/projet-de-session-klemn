import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import styles from '../../styles/Parametres.module.css'
import ModifierProfil from './ModifierProfil';
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';

function Parametres() {
    return (
        <div className={styles.body}>
            </div>
        </div>

    );

}

export default Parametres;