import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import style from '../styles/Markdown.module.css'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface MarkdownCodeProps {
    c: string // Code a render
}

function MarkdownCode(props: MarkdownCodeProps) {
    // https://raw.githubusercontent.com/a23-b2b/projet-de-session-klemn/main/README.md?token=GHSAT0AAAAAACG6FDOULTCHY2ZGNYHCYGM4ZJZCVQA

    return (<>
        <div className={style.conteneur}>
            <Markdown components={{                
                /*code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dracula}
                        language={match[1]}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )}, 
                C'est faisable mais wtf????? Pour highlight de syntaxe 
                https://github.com/remarkjs/remark 
                https://github.com/react-syntax-highlighter/react-syntax-highlighter
                https://www.npmjs.com/package/react-markdown#appendix-b-components*/
                // https://blog.logrocket.com/guide-syntax-highlighting-react/ 
                // Je me suis perdu sur le site de NPM oopsie!!! 
                code(props){
                    const {node, ...rest} = props
                    return <code style={{border: '1px solid', borderRadius: '10px', padding: '2%', background: 'lightGrey' }} {...rest} />
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
                ol(props) {
                    const {node, ...rest} = props
                    return <ol style={{listStyleType: 'circle'}} {...rest}/>
                }
            }} className={style.reactMarkDown} remarkPlugins={[remarkGfm, remarkRehype]} children={props.c}></Markdown>
        </div>
    </>)




}

export default MarkdownCode