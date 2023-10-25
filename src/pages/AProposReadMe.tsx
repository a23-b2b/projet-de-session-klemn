import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

import React, { useState } from 'react'
import Markdown from 'react-markdown'
import ReactDom from 'react-dom'
import remarkGfm from 'remark-gfm'


function AProposReadMe () {
    // https://raw.githubusercontent.com/a23-b2b/projet-de-session-klemn/main/README.md?token=GHSAT0AAAAAACG6FDOULTCHY2ZGNYHCYGM4ZJZCVQA
    
    const [readme, setReadme] = useState("");

    useState(() => {
        GetReadMe()
    });

    async function GetReadMe() {
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
                        console.log(response)
                        setReadme(response)
                    }).catch((error) => {
                        toast.error(`Une erreur est survenue: ${error}`)
                    })
                })
            }
        })
    }

    return <Markdown remarkPlugins={[remarkGfm]}>{readme}</Markdown>
    
}

export default  AProposReadMe