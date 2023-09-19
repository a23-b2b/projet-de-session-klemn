import styles from '../styles/Accueil.module.css'

function Erreur404() {
    return (
        <div style={{ margin: "auto", minHeight: "100vh", textAlign: "center" }}>
            <h1 style={{fontSize:"5rem"}}>404</h1>
            <h2>Vous vous êtes perdu! La page que vous tentez d'atteindre n'existe pas.</h2>
        </div>
    );
}

export default Erreur404;