import styles from '../styles/GestionCollab.module.css';
import GestionDemandeCollab from '../components/GestionDemandeCollab'
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function GestionCollab() {
    const navigate = useNavigate();

    // get demande de collab
    const [demandesCollab, setDemandesCollab] = useState<any[]>([])
    getDemandeCollab()

    return (
        <>
            {/*Faire map sur retour de demande de collab*/}
            <GestionDemandeCollab
                // TODO: FILL DATA 
                id_compte={"null"}
                id_projet={""}
                titre={""}
                description={""}
                />
        </> 
    )
    
    async function getDemandeCollab () {    
        
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                fetch(`${process.env.REACT_APP_API_URL}/get-all-demande-collab/${uid}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },                
                })
                    .then(response => response.json())
                    .then(response =>{
                        setDemandesCollab(response)
                        console.log("Rep: " + response)
                }).catch(err => {
                    // TODO: Gestion err 
                })
            } else {
                navigate("/authenticate")
            }
        })
    }
} 

export default GestionCollab