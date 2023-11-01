import { Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

function Chargement() {
    const [showLoading, setShowLoading] = useState(false);

    const SPINNER_HEIGHT = 24;

    // attendre 500ms avant dafficher le spinner de chargement
    useEffect(() => {
        setTimeout(() => {
            setShowLoading(true);
        }, 500)
    }, []);

    if (showLoading) {
        return (
            <div style={{
                width: "100%", minHeight: `calc(${SPINNER_HEIGHT}px * 2)`, display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"
            }}>
                <Spinner boxSize={SPINNER_HEIGHT} />
            </div>
        );
    }

    return <></>
}

export default Chargement;