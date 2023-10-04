import { Link, useNavigate } from 'react-router-dom';
import BlogueForm from '../components/BlogueForm';
import PosteCollab from "../components/Post/PosteCollab";

export interface PostProp {
    idPost: string;
    date: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    titre: string;
    contenu: string;
    type: string;
    status: boolean;
    meilleureReponse: number;
    nombreLike: number;
    nombrePartage: number;
    nombreCommentaire: number;
    nombreDislike: number;
    idCompte: string;
}


function Blogue() {
    const navigate = useNavigate();
    
    return (
        <div>

            <div>
                <div className='conteneurComposantPosteBlogue'>
                <PosteCollab
                    date="22222"
                    nomAffichage="222222"
                    nomUtilisateur="2"
                    titre="tt"
                    contenu="xx"
                    idCompte="22"
                    nombreLike={0}
                    nombreDislike={0}
                    nombrePartage={0}
                    nombreCommentaire={0}
                    isPostFullScreen={false}
                    idPost=""
                    urlImageProfil=""

                    // TODO: AJOUTER URL_GIT
                />
                </div>                
            </div>
        </div>
    );
}

export default Blogue;
