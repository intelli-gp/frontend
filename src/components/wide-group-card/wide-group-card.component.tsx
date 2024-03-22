import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { ReceivedGroup } from '../../types/group';
import Tag from '../tag/tag.component';
import {
    CardContainer,
    CardImage,
    GroupTitle,
    TagsContainer,
    TypographyContainer,
} from './wide-group-card.style';

interface WideGroupCardProps extends Partial<ReceivedGroup> {
    /**
     * 'admin' | 'member' | 'owner'
     */
    UserRole: string;
}

const WideGroupCard = ({
    ID,
    GroupTitle: title,
    GroupCoverImage: cover_image_url,
    GroupTags,
    GroupMembers,
    UserRole,
}: WideGroupCardProps) => {
    const navigate = useNavigate();

    return (
        <CardContainer
            onClick={() => {
                navigate(`/app/groups/${ID}`);
            }}
        >
            <CardImage src={cover_image_url || defaultGroupImage} alt={title} />
            <TypographyContainer role={UserRole}>
                <GroupTitle title={title} lines={1}>
                    {title}
                </GroupTitle>

                <p className="text-xs ml-1">
                    {GroupMembers?.length ?? 0} Members
                </p>
                <TagsContainer>
                    {GroupTags?.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} size="xs" />
                    ))}
                </TagsContainer>
            </TypographyContainer>
        </CardContainer>
    );
};

export default WideGroupCard;
