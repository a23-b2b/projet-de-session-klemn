import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
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
                        console.log(response)

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
            <Markdown components={{
                code(props) {
                    const {node, ...rest} = props
                    return <code style={{color: 'yellow'}} {...rest} />
                },
                table(props){
                    const {node, ...rest} = props
                    return <table style={{border: '1px solid' }} {...rest} />
                },
                th(props){
                    const {node, ...rest} = props
                    return <th style={{border: '1px solid' }} {...rest} />
                },
                td(props){
                    const {node, ...rest} = props
                    return <td style={{border: '1px solid' }} {...rest} />
                },
                ul(props) {
                    return <ul style={{listStyleType: 'circle'}}/>
                }
            }} className={style.reactMarkDown} remarkPlugins={[remarkGfm, remarkRehype]} children={md}></Markdown>
        </div>
    </>)




}

export default AProposReadMe