import Bonjour from '../components/ComponentWithParameters';
import HelloWorldComponent from '../components/HelloWorldComponent';
import styles from '../styles/Profil.module.css'

function Profil() {
    return (
        <div className={styles.flex}>

            <div className={styles.header}>
                <img className={styles.photo_banniere} src='https://media.tacdn.com/media/attractions-splice-spp-674x446/0e/49/3e/49.jpg' />

                <div className={styles.sous_banniere}>
                    <img className={styles.photo_profil} src='https://fr.web.img6.acsta.net/medias/nmedia/18/71/84/20/19146888.jpg' />

                    <div className={styles.infos_profil}>
                        <h2 className={styles.nom}>Bob Gratton</h2>
                        <p className={styles.username}>@bobgratton08</p>
                        <button className={`${styles.bouton_follow} global_bouton`}>Suivre</button>
                    </div>

                </div>
                
                <div className={styles.follows}>
                    <div><p>19293</p> abonnés</div>
                    <div><p>196</p> Abonnements</div>
                </div>

                <p className={styles.bio}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab explicabo excepturi amet officia commodi, exercitationem impedit voluptatum incidunt obcaecati deserunt aliquam temporibus quasi mollitia id a natus adipisci voluptates ea?</p>
            </div>

            <div className={styles.content}>
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
                <div className={styles.temporaire_post} />
            </div>
        </div>
    );
}

export default Profil;
