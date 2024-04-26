import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { MessagesNotification } from '../../types/notifications';
import {
    CardContainer,
    CardImage,
    ChatDate,
    GroupTitle,
    LastMessageAuthorName,
    LastMessageContent,
    TypographyContainer,
    UnreadMessagesCounter,
} from './chat-card.style';

const ChatCard = ({
    Group,
    LastMessage,
    UnreadMessagesCount,
}: Partial<MessagesNotification>) => {
    const navigate = useNavigate();

    if (!LastMessage) {
        return null;
    }

    return (
        <CardContainer
            unread={(UnreadMessagesCount || 0) > 0}
            onClick={() => {
                navigate(`/app/chat-room/${Group?.ID}`);
            }}
        >
            <CardImage
                src={Group?.GroupCoverImage || defaultGroupImage}
                alt={Group?.GroupTitle}
            />

            <TypographyContainer>
                <GroupTitle title={Group?.GroupTitle}>
                    {Group?.GroupTitle}
                </GroupTitle>
                <LastMessageContent title={LastMessage?.Content}>
                    <LastMessageAuthorName>
                        {LastMessage?.User.FullName.split(' ')[0] + ': '}
                    </LastMessageAuthorName>
                    {LastMessage?.Content}
                </LastMessageContent>
                <ChatDate>{moment(LastMessage?.CreatedAt).fromNow()} </ChatDate>
            </TypographyContainer>

            {(UnreadMessagesCount || 0) > 0 && (
                <UnreadMessagesCounter>
                    {UnreadMessagesCount}
                </UnreadMessagesCounter>
            )}
        </CardContainer>
    );
};

export default ChatCard;
