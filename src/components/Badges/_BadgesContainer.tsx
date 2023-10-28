import Badge from "./Badge";
import styles from '../../styles/Badge.module.css'
import { FaComputer, FaBugs } from 'react-icons/fa6'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { TbBeta } from 'react-icons/tb'

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

    const userBadges: Badges[] = [];

    for (const badge in Badges) {
        const badgeValue = Badges[badge] as unknown as number;

        if (props.badgesInt & badgeValue) {
            userBadges.push(badgeValue as Badges);
        }
    }

    return (
        <div>
            {userBadges?.map((badge) => {
                if (badge === Badges.DevTeam) {
                    return <Badge icon={<FaComputer />} title={"Developpeur"} />
                }

                if (badge === Badges.Verifie) {
                    return <Badge icon={<RiVerifiedBadgeFill />} title={"Verifie"} />
                }

                if (badge === Badges.BugFinder) {
                    return <Badge icon={<FaBugs />} title={"Bug Finder"} />
                }


                if (badge === Badges.EarlyUser) {
                    return <Badge icon={<TbBeta />} title={"Early user"} />
                }

                return (
                    <>rien</>
                )
            })}
        </div>
    )

}

export default BadgesContainer;