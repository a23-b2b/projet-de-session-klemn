import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Landing.module.css'
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';

function Landing() {
    const [formIsLogin, setFormIsLogin] = useState(true);

    return (

        <div className={styles.flexbox}>
            <div className={styles.flex_child}>

                {formIsLogin && (
                    <div >
                        <div>
                            <LoginForm />
                        </div>

                        <div className={styles.conteneur_Texte}>
                            <div>
                                <p>Vous n'avez pas de compte?</p>
                            </div>
                            <div>
                                <p className={'global_text_accent'} id={styles["text_accent"]}  onClick={() => setFormIsLogin(false)}>Inscrivez vous maintenant!</p>

                            </div>
                        </div>
                    </div>

                )}

                {!formIsLogin && (
                    <div>
                        <div>
                            <RegisterForm />
                        </div>

                        <div className={styles.conteneur_Texte}>
                            <div>
                                <p>Vous êtes déjà inscrit?</p></div>
                            <div>
                                <p className={'global_text_accent'} id={styles["text_accent"]} onClick={() => setFormIsLogin(true)}>Connectez vous maintenant!</p>

                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='global_container_gradient' >
                <h2>Contenu a droite ici!!</h2>
                <p className={styles.paragraphe}>
                KLEMN est bien plus qu'un simple site, c'est une plateforme dynamique qui révolutionne la manière dont nous interagissons en ligne. 
                Conçu pour favoriser la collaboration et le partage de connaissances, KLEMN offre un espace polyvalent où les utilisateurs peuvent poser des questions, 
                collaborer sur des projets passionnants, écrire des blogs captivants et élargir leur réseau en suivant des abonnés partageant les mêmes idées.
                <br></br>
                <br></br>
                Que vous soyez un professionnel cherchant à élargir votre expertise ou un passionné souhaitant partager ses connaissances,
                KLEMN offre un terrain de jeu interactif et stimulant. Grâce à ses fonctionnalités conviviales, vous pouvez non seulement trouver des réponses pertinentes à vos questions,
                 mais aussi participer activement à des projets collaboratifs, créer du contenu inspirant et connecter avec des esprits créatifs du monde entier.
                <br></br>
                <br></br>
                Rejoignez la communauté florissante de KLEMN et découvrez un univers où le partage et la collaboration ne connaissent pas de limites. 
                Enrichissez votre expérience en ligne en participant à cette plateforme innovante qui met l'accent sur la connectivité, 
                l'apprentissage continu et le développement collaboratif.
                </p>
            </div>
        </div>

    );
}

export default Landing;
