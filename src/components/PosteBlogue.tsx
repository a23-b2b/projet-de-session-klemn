import user from '../images/user.png';
import styles from '../styles/Post.module.css'

function PosteBlogue() {
    return (
        <div>
            {/* Post Blogue */}
            <div>
                {/* Section Haut */}

                <div>
                    {/* Icone Utilisateur */}
                    <img src={user} width="40" height="40" alt="User" />
                </div>

                <div>
                    {/* Nom Utilisateur et @*/}
                    <h3>Nom Prénom</h3>
                </div>

                <div>
                    {/* Date du post*/}
                    <p>25 mins</p>
                </div>

                <div>
                    {/* Autre fonctionnalitées */}
                    <p>...</p>
                </div>


            </div>

            <div>
                {/* Section Bas */}

                <div>
                    {/* Titre du post*/}
                    <h2>Titre du post Blogue!</h2>
                </div>

                <div>
                    {/* Description du post*/}
                    <p>
                        Nam quis neque maximus lorem venenatis interdum sit amet sed est.
                        Vivamus volutpat augue ligula, maximus ornare dui condimentum eu.
                        Proin sed venenatis justo. Nullam non enim velit.
                        Nunc semper nisl tincidunt, euismod leo quis, molestie magna.
                        Vivamus condimentum scelerisque tellus ut egestas.
                        Proin consequat sapien vel auctor auctor. Nulla id euismod augue.</p>
                </div>

            </div>
        </div>
    );
}

export default PosteBlogue;