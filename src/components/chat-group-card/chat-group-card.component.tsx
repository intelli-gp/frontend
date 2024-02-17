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
} from './chat-group-card-.style';

const GroupCard = ({
    title,
    cover_image_url,
    group_tag,
    group_user,
}: ReceivedGroup) => {
    return (
        <CardContainer>
            <CardImageContainer>
                <CardImage
                    src={cover_image_url || defaultGroupImage}
                    alt={title}
                />
                <GroupTitleGradient>
                    <GroupTitle title={title}>{title}</GroupTitle>
                </GroupTitleGradient>
            </CardImageContainer>

            <p className="text-sm">{group_user.length} Members</p>

            <TagsContainer>
                {group_tag.slice(0, 2).map((tag) => (
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
