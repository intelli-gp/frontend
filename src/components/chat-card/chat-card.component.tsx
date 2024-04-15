import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { MessagesNotification } from '../../types/notifications';
import {
    CardContainer,
    CardImage,
    CardImageContainer,
    ChatContent,
    ChatDate,
    GroupTitle,
    TypographyContainer,
    UnreadMessages,
} from './chat-card.style';

const ChatCard = ({
    Group,
    LastMessage,
    UnreadMessagesCount,
}: Partial<MessagesNotification>) => {
    const navigate = useNavigate();

    return (
        <CardContainer
            unread={(UnreadMessagesCount || 0) > 0}
            onClick={() => {
                navigate(`/app/chat-room/${Group?.ID}`);
            }}
        >
            <CardImageContainer>
                <CardImage
                    src={Group?.GroupCoverImage || defaultGroupImage}
                    alt={Group?.GroupTitle}
                />
            </CardImageContainer>
            <TypographyContainer>
                <GroupTitle title={Group?.GroupTitle}>
                    {Group?.GroupTitle}
                </GroupTitle>
                <ChatContent>
                    <span className="font-extrabold">
                        {LastMessage?.User.FullName + ': '}
                    </span>
                    {LastMessage?.Content}
                </ChatContent>
                <ChatDate>{moment(LastMessage?.CreatedAt).fromNow()} </ChatDate>
            </TypographyContainer>
            {(UnreadMessagesCount || 0) > 0 && (
                <UnreadMessages>
                    <p>{String(UnreadMessagesCount)}</p>
                </UnreadMessages>
            )}
        </CardContainer>
    );
};

export default ChatCard;
