import { LuDot } from 'react-icons/lu';
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
    GroupInfo,
    GroupTitle,
    MembersCount,
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
            </CardImageContainer>

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

                <ButtonsContainer>
                    <Button
                        select="primary500"
                        title="Become a member of this group"
                        onClick={handleJoiningGroup}
                    >
                        Join group
                    </Button>
                </ButtonsContainer>
            </GroupInfo>
        </CardContainer>
    );
};

export default GroupCard;
