import { Tooltip } from "@chakra-ui/react"
import styles from '../../styles/Badge.module.css'

interface Props {
    icon: React.ReactNode,
    title: string
}

function Badge(props: Props) {
    return (
        <span className={styles.badge}>
            <Tooltip className={styles.tooltip} label={props.title} placement='bottom'>
                <span>{props.icon}</span>
            </Tooltip>
        </span>
    )
}

export default Badge;