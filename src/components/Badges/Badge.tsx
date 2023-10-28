interface Props {
    icon: string,
    title: string
}

function Badge(props: Props) { 
    return (
        <div>
            [{props.icon}] {props.title}
        </div>
    )
}

export default Badge;