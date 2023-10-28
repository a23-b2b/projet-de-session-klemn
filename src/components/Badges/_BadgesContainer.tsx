import Badge from "./Badge";

interface Props {
    badgesInt: number
}

enum Badges {
    DevTeam = 1 << 0,
    Verifie = 1 << 1,
    BugFinder = 1 << 2,
    EarlyUser = 1 << 3,
}

function BadgesContainer(props: Props) {

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
                if (badge === Badges.DevTeam) {
                    return <Badge icon={"icon"} title={"Developpeur"} />
                }

                if (badge === Badges.Verifie) {
                    return <Badge icon={"icon"} title={"Verifie"} />
                }

                if (badge === Badges.BugFinder) {
                    return <Badge icon={"icon"} title={"Bug Finder"} />
                }


                if (badge === Badges.EarlyUser) {
                    return <Badge icon={"icon"} title={"Early user"} />
                }

                return (
                    <>rien</>
                )
            })}
        </div>
    )

}

export default BadgesContainer;