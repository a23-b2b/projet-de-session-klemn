import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import style from '../styles/Markdown.module.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownCodeProps {
    c: string // Code markdown a render
}

function MarkdownCode(props: MarkdownCodeProps) {
    return (<>
        <div className={style.conteneur}>
            <Markdown components={{
                code(props) { // Block de code 
                    const { children, className, } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            showLineNumbers={true}
                        />
                    ) : (<p>
                        <code className={style.inline_code}>
                            {children}
                        </code>
                    </p>
                    )
                },
                /*
                    https://github.com/remarkjs/remark 
                    https://github.com/react-syntax-highlighter/react-syntax-highlighter
                    https://www.npmjs.com/package/react-markdown#appendix-b-components
                    https://blog.logrocket.com/guide-syntax-highlighting-react/  
                */

                table(props) { // Table
                    const { node, ...rest } = props
                    return <table className={style.table} {...rest} />
                },
                th(props) { // Header de table
                    const { node, ...rest } = props
                    return <th className={style.th} {...rest} />
                },
                td(props) { // Delta de table
                    const { node, ...rest } = props
                    return <td className={style.td} {...rest} />
                },
                ol(props) { // Liste ordonnee
                    const { node, ...rest } = props
                    return <ol className={style.ol} {...rest} />
                }
            }} className={style.reactMarkDown} remarkPlugins={[remarkGfm, remarkRehype]} children={props.c}></Markdown>
        </div>
    </>)

}

export default MarkdownCode