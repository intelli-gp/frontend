import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { useJoinGroupMutation } from '../../store';
import { ReceivedGroup } from '../../types/group';
import { errorToast } from '../../utils/toasts';
import Button from '../button/button.component';
import Tag from '../tag/tag.component';
import {
    ButtonsContainer,
    CardContainer,
    CardImage,
    CardImageContainer,
    GroupTitle,
    GroupTitleGradient,
    TagsContainer,
} from './chat-group-card.style';

const GroupCard = ({
    ID,
    GroupTitle: title,
    GroupCoverImage,
    GroupTags,
    GroupMembers,
}: Partial<ReceivedGroup>) => {
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
    return (
        <CardContainer
            onClick={() => {
                navigate(`/app/groups/${ID}`);
            }}
        >
            <CardImageContainer>
                <CardImage
                    src={GroupCoverImage || defaultGroupImage}
                    alt={title}
                />
                <GroupTitleGradient>
                    <GroupTitle title={title}>{title}</GroupTitle>
                </GroupTitleGradient>
            </CardImageContainer>

            <p className="text-sm">{GroupMembers?.length ?? 0} Members</p>

            <TagsContainer>
                {GroupTags?.slice(0, 2).map((tag) => (
                    <Tag key={tag} text={tag} size="xs" />
                ))}
            </TagsContainer>

            <ButtonsContainer>
                <Button
                    title="Become a member of this group"
                    onClick={handleJoiningGroup}
                >
                    Join
                </Button>
            </ButtonsContainer>
        </CardContainer>
    );
};

export default GroupCard;
