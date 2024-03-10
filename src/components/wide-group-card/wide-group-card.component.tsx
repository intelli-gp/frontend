import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { ReceivedGroup } from '../../types/group';
import Tag from '../tag/tag.component';
import ExitModal from '../ExitGroupModal';

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
import { useState } from 'react';

const WideGroupCard = ({
    group_id,
    title,
    cover_image_url,
    GroupTags,
    GroupMembers,
}: Partial<ReceivedGroup>) => {
    const navigate = useNavigate();
    const [showExitModal, setExitModal] = useState(false);
    const openExitModal = () => {
        setExitModal((prev) => !prev);
    };
    return (
        <CardContainer
            
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
            <ViewButton type="button" onClick={() => {
                navigate(`/app/groups/${group_id}`);
            }} title="Become a member of this group">
                    View
                </ViewButton>
                <ExitButton type="button" outline select='danger' onClick={openExitModal} title="Leave this group">
                    Exit group
                </ExitButton>
                </ButtonsContainer>
                <ExitModal
                id={group_id}
                showModal={showExitModal}
                setShowModal={setExitModal}
            />
        </CardContainer>
    );
};

export default WideGroupCard;
