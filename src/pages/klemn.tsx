import { useState, useEffect, useRef } from "react";
import styles from '../styles/klemn.module.css'
import { Link } from 'react-router-dom';


function Klemn() {



    function handleClickScroll(id: any) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: "center" });

        }
    }





    return (<>
        <div id={styles["conteneur"]}>

            <div id={styles["conteneurTableMatieres"]} className={'global_container_4'}>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('produit')}>
                    <h2>Produit</h2>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('aPropos')}>
                    <h3>À Propos</h3>
                </Link>


                <Link className={'link'} to={''} onClick={() => handleClickScroll('resources')}>
                    <h3>Resources</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('projet')}>
                    <h3>Projet</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('entreprise')}>
                    <h3>Entreprise</h3>
                </Link>

                <br></br>


                <Link className={'link'} to={''} onClick={() => handleClickScroll('platformes')}>
                    <h2>Platformes</h2>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('api')}>
                    <h3>API</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('github')}>
                    <h3>Github</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('react')}>
                    <h3>React</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('oracle')}>
                    <h3>Oracle</h3>
                </Link>

                <br></br>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('support')}>
                    <h2>Support</h2>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('document')}>
                    <h3>Document</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('forum')}>
                    <h3>Forum</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('services')}>
                    <h3>Services</h3>
                </Link>

                <Link className={'link'} to={''} onClick={() => handleClickScroll('status')}>
                    <h3>Status</h3>
                </Link>


            </div>

            <div id={styles["conteneurPage"]}>

                <h1 id="produit">Produit</h1>


                <h2 id="aPropos">À Propos</h2>
                <p className={styles.paragraphe}>
                    KLEMN est bien plus qu'un simple site, c'est une plateforme dynamique qui révolutionne la manière dont nous interagissons en ligne.
                    Conçu pour favoriser la collaboration et le partage de connaissances, KLEMN offre un espace polyvalent où les utilisateurs peuvent poser des questions,
                    collaborer sur des projets passionnants, écrire des blogs captivants et élargir leur réseau en suivant des abonnés partageant les mêmes idées.
                    <br/>
                    <br/>
                    Que vous soyez un professionnel cherchant à élargir votre expertise ou un passionné souhaitant partager ses connaissances,
                    KLEMN offre un terrain de jeu interactif et stimulant. Grâce à ses fonctionnalités conviviales, vous pouvez non seulement trouver des réponses pertinentes à vos questions,
                    mais aussi participer activement à des projets collaboratifs, créer du contenu inspirant et connecter avec des esprits créatifs du monde entier.
                    <br/>
                    <br/>
                    Rejoignez la communauté florissante de KLEMN et découvrez un univers où le partage et la collaboration ne connaissent pas de limites.
                    Enrichissez votre expérience en ligne en participant à cette plateforme innovante qui met l'accent sur la connectivité,
                    l'apprentissage continu et le développement collaboratif.
                </p>
                <h2 id="resources">Resources</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="projet">Projet</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="entreprise">Entreprise</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>

                <br></br>
                <br></br>

                <h1 id="platformes">Platformes</h1>

                <h2 id="api">API</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="github">Github</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="react">React</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="oracle">Oracle</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>

                <br></br>
                <br></br>
                <h1 id="support">Support</h1>

                <h2 id="document">Document</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="forum">Forum</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="services">Services</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
                <h2 id="status">Status</h2>
                <p>
                    Explorez une multitude de possibilités sur KLEMN,
                    où chaque section est conçue pour enrichir votre expérience.
                    Découvrez nos produits innovants qui repoussent les limites de la collaboration en ligne.
                    Plongez dans l'histoire et la mission de notre entreprise avec la section "À propos",
                    et explorez les ressources qui vous aideront à maximiser votre utilisation de la plateforme.
                </p>
            </div>
        </div>
    </>)
}

export default Klemn;