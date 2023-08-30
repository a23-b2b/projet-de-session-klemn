interface props {
    prenom: string
}

function Bonjour(props: props) {
    return (
        <h3>Bonjour {props.prenom} !</h3>
    );
}

export default Bonjour;