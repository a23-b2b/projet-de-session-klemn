import { useNavigate } from 'react-router-dom';
import PosteBlogue from '../components/PosteBlogue';
import toast from 'react-hot-toast';
import { request } from 'http';
import { BlogueProp } from '../components/PosteBlogue';


function Blogue() {
    const navigate = useNavigate();
    const blogue : BlogueProp = chargerPosteBlogue();

    var prop: BlogueProp = {
        idPost: 0,
        date: "",
        nom: "",
        prenom: "",
        nomUtilisateur: "",
        titre: "",
        contenu: ""
    }

    function chargerPosteBlogue(): BlogueProp  {
        fetch('http://localhost:1111/chargerPosteBlogue', {
            method: 'GET'
        })
        .then (response => response.json())
        .then (data => {          
            prop = {
                idPost: data.id_post,
                date: data.date,
                nom: data.nom,
                prenom: data.prenom,
                nomUtilisateur: data.nom_utilisateur,
                titre: data.titre,
                contenu: data.corps
            }
        }) 
        .catch((error) => {     
            toast.error('Une erreur est survenue: ' + error.name)                      
        });

        return prop;

    }

    return (
        <div>
            <div >
                <h1>Page Blogue </h1>
                <div className='conteneurComposantPosteBlogue'> 
                    <PosteBlogue
                        idPost = {blogue.idPost}
                        date = {blogue.date}
                        nom = {blogue.nom}
                        prenom = {blogue.prenom}
                        nomUtilisateur = {blogue.nomUtilisateur}
                        titre = {blogue.titre}
                        contenu = {blogue.contenu}
                    />
                </div>
            </div>

        </div>



    );
}

export default Blogue;
