import { Link, useParams } from 'react-router-dom';
import user from '../images/user.png';
import styles from '../styles/Post.module.css'
import { AiFillDislike, AiFillLike, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFillReplyAllFill } from 'react-icons/bs'
import { motion } from 'framer-motion';
import { useState } from 'react';


function Reponse() {
    return (
        <div>
            <h6>Titre de mon commentaire</h6>
            <p>contenu de mon commentaire</p>
        </div>
    );
}

export default Reponse;