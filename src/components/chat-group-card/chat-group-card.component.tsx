import { FaCrown, FaUser } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { useJoinGroupMutation } from '../../store';
import { ReceivedGroup } from '../../types/group';
import { errorToast } from '../../utils/toasts';
import Button from '../button/button.component';
import Tag from '../tag/tag.component';
import {
    BadgeContainer,
    ButtonsContainer,
    CardContainer,
    CardImage,
    GroupDescription,
    GroupInfo,
    GroupTitle,
    MembersCount,
    TagsContainer,
} from './chat-group-card.style';

type GroupCardProps = Partial<ReceivedGroup> & {
    /**
     * If the card is being rendered on the profile page
     * this is used to tune the component to the profile page.
     */
    profilePage?: boolean;
    /**
     * 'admin' | 'member' | 'owner'
     */
    UserRole?: string;

    /**
     * If the user has already joined the group
     */
    alreadyJoined?: boolean;
};

const GroupCard = ({
    ID,
    GroupTitle: title,
    GroupCoverImage,
    GroupTags,
    GroupMembers,
    GroupDescription: description,
    UserRole = 'member',
    profilePage = false,
    alreadyJoined = false,
}: GroupCardProps) => {
    const navigate = useNavigate();

    const [joinGroup] = useJoinGroupMutation();

    const handleJoiningGroup = async () => {
        try {
            await joinGroup(ID!).unwrap();
            navigate(`/app/chat-room/${ID}`);
        } catch (error) {
            errorToast('Error occurred while joining the group');
        }
    };

    let badgeIcon: JSX.Element = <FaUser />; // Default badge as a member.
    switch (UserRole) {
        case 'owner':
            badgeIcon = <FaCrown />;
            break;
        case 'admin':
            badgeIcon = <MdAdminPanelSettings />;
            break;
    }

    return (
        <CardContainer
            profilePage={profilePage}
            onClick={() => {
                navigate(`/app/groups/${ID}`);
            }}
        >
            <CardImage src={GroupCoverImage || defaultGroupImage} alt={title} />
            <GroupInfo>
                <GroupTitle title={title}>{title}</GroupTitle>
                <MembersCount>
                    {GroupMembers?.length ?? 0} Members {<LuDot />} Online group
                </MembersCount>
                <TagsContainer>
                    {GroupTags?.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} size="xs" />
                    ))}
                </TagsContainer>

                {!profilePage && (
                    <>
                        <GroupDescription lines={2}>
                            {description}
                        </GroupDescription>
                        <ButtonsContainer>
                            <Button
                                select={
                                    alreadyJoined ? 'secondary' : 'primary700'
                                }
                                title={
                                    alreadyJoined
                                        ? 'You already joined this group'
                                        : 'Become a member of this group'
                                }
                                onClick={handleJoiningGroup}
                                disabled={alreadyJoined}
                            >
                                {alreadyJoined
                                    ? 'Already joined'
                                    : 'Join group'}
                            </Button>
                        </ButtonsContainer>
                    </>
                )}
            </GroupInfo>

            {profilePage && (
                <BadgeContainer role={UserRole} title={UserRole}>
                    {badgeIcon}
                </BadgeContainer>
            )}
        </CardContainer>
    );
};

export default GroupCard;
