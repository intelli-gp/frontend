import { useNavigate } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import { ReceivedGroup } from '../../types/group';
import {
    CardContainer,
    CardImage,
    CardImageContainer,
    ChatContent,
    ChatDate,
    GroupTitle,
    TypographyContainer,
} from './chat-card.style';

const ChatCard = ({
    ID,
    GroupTitle: title,
    GroupCoverImage,
}: Partial<ReceivedGroup>) => {
    const navigate = useNavigate();
    const message = {
        Username: 'Youmna_Mahmoud',
        Content:
            'I am hosting a party this Thursday at 4 PM and I would love for all of you to join me. I am confident that you will have a great time. If you plan on attending, please kindly confirm your presence.',
    };

    return (
        <CardContainer
            onClick={() => {
                navigate(`/app/chat-room/${ID}`);
            }}
        >
            <CardImageContainer>
                <CardImage
                    src={GroupCoverImage || defaultGroupImage}
                    alt={title}
                />
            </CardImageContainer>
            <TypographyContainer>
                <GroupTitle title={title}>{title}</GroupTitle>
                <ChatContent>
                    <span className="font-extrabold">
                        {message.Username + ': '}
                    </span>
                    {message.Content}
                </ChatContent>
                <ChatDate>3 minutes ago</ChatDate>
            </TypographyContainer>
        </CardContainer>
    );
};

export default ChatCard;
