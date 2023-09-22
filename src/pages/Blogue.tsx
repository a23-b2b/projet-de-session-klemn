import { Link, useNavigate } from 'react-router-dom';
import PosteBlogue from '../components/Post/PosteBlogue';
import toast from 'react-hot-toast';
import { BlogueProp } from '../components/Post/PosteBlogue';
import QuestionProp from '../components/Post/PosteQuestion';
import PosteQuestion from '../components/Post/PosteQuestion';



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
                <PosteQuestion
                    date="2 juin"
                    nomAffichage="Nathan AFiichage"
                    nomUtilisateur="TP2334"
                    titre="titree"
                    contenu="cont"
                    idCompte="idCompte"
                    nombreLike={1}
                    nombreDislike={1} 
                    nombrePartage= {1}
                    nombreCommentaire={1} 
                    isPostFullScreen={false}
                    idPost="idPost" 

                    
                />
                </div>                
            </div>
        </div>
    );
}

export default Blogue;
