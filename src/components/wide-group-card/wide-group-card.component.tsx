import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { ReceivedGroup } from '../../types/group';
import Tag from '../tag/tag.component';
import {
    CardContainer,
    CardImage,
    CardImageContainer,
    GroupTitle,
    ViewButton,
    TagsContainer,
    ButtonsContainer,
    TypographyContainer,
    ExitButton,
} from './wide-group-card.style';

const WideGroupCard = ({
    group_id,
    title,
    cover_image_url,
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
            </CardImageContainer>
            <TypographyContainer>
                <GroupTitle title={title}>{title}</GroupTitle>

                <p className="text-sm">{GroupMembers?.length ?? 0} Members</p>
                <TagsContainer>
                    {GroupTags?.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} size="xs" />
                    ))}
                </TagsContainer>
            </TypographyContainer>
            <ButtonsContainer>
            <ViewButton type="button" title="Become a member of this group">
                    View
                </ViewButton>
                <ExitButton type="button" outline select='danger' title="Leave this group">
                    Exit group
                </ExitButton>
                </ButtonsContainer>

        </CardContainer>
    );
};

export default WideGroupCard;
