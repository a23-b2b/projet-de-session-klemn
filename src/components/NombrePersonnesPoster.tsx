import styles from '../styles/UserReference.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import Modal from './Modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { userInfo } from 'os';

interface NombrePersonnesPosterProps {
    nombrePersonnes: number;
}

const NombrePersonnesPoster: React.FC<NombrePersonnesPosterProps> = ({ nombrePersonnes }) => {
    return (
        <div>
            <h1>Nombre de participants : {nombrePersonnes}</h1>
        </div>
    );
};

export default NombrePersonnesPoster;
