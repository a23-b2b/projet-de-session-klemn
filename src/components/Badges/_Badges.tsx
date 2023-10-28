interface Props {
    badgesInt: number
}

enum Badges {
    Developpeur = 1 << 0,
    Verifie = 1 << 1,
    BugFinder = 1 << 2,
    EarlyUser = 1 << 3,
}

function Badge(props: Props) {

    const badges: Badges[] = [];

    for (const badge in Badges) {
        const badgeValue = Badges[badge] as unknown as number;

        if (props.badgesInt & badgeValue) {
            badges.push(badgeValue as Badges);
        }
    }

    return (
        <div>
            {badges?.map((badge) => {
                if (badge === Badges.Developpeur) {
                    return (
                        <>
                            developpeur, {' '}
                        </>
                    )
                }

                if (badge === Badges.Verifie) {
                    return (
                        <>
                            verife, {' '}
                        </>
                    )
                }

                if (badge === Badges.BugFinder) {
                    return (
                        <>
                            bug finder, {' '}
                        </>
                    )
                }


                if (badge === Badges.EarlyUser) {
                    return (
                        <>
                            early user, {' '}
                        </>
                    )
                }

                return (
                    <>rien</>
                )
            })}
        </div>
    )

}

export default Badge;