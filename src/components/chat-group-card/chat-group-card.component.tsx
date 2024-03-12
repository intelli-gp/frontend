import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { ReceivedGroup } from '../../types/group';
import Tag from '../tag/tag.component';
import {
    CardContainer,
    CardImage,
    CardImageContainer,
    GroupTitle,
    GroupTitleGradient,
    JoinButton,
    TagsContainer,
} from './chat-group-card.style';

const GroupCard = ({
    ID: group_id,
    GroupTitle: title,
    GroupCoverImage: cover_image_url,
    GroupTags,
    GroupMembers,
}: Partial<ReceivedGroup>) => {
    const navigate = useNavigate();
    return (
        <CardContainer
            onClick={() => {
                navigate(`/app/groups/${group_id}`);
            }}
        >
            <CardImageContainer>
                <CardImage
                    src={cover_image_url || defaultGroupImage}
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

            <JoinButton type="button" title="Become a member of this group">
                Join
            </JoinButton>
        </CardContainer>
    );
};

export default GroupCard;
