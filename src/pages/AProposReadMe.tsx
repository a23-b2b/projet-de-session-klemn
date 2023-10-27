import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import MarkdownCode from '../components/MarkdownCode';
import style from '../styles/Markdown.module.css'


function AProposReadMe() {
    // https://raw.githubusercontent.com/a23-b2b/projet-de-session-klemn/main/README.md?token=GHSAT0AAAAAACG6FDOULTCHY2ZGNYHCYGM4ZJZCVQA

    const [md, setMd] = useState('')

    useEffect(() => {
        getMd()
    }, []);

    async function getMd() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                    fetch(`${process.env.REACT_APP_API_URL}/readme`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'text/plain',
                            'authorization': idToken
                        }
                    }).then(response => response.text()).then(response => {
                        setMd(response)
                    }).catch((error) => {
                        toast.error(`Une erreur est survenue: ${error}`)
                    })
                })
            }
        })
    }

    // https://stackoverflow.com/questions/66356329/how-to-add-styling-for-elements-in-react-markdown
    return (<>
        <div className={style.conteneur}>
            <MarkdownCode c={md}/>
        </div>
    </>)
}

export default AProposReadMe