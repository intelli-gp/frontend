import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AIimg from '../../assets/imgs/AI-profile.svg';
import { CustomInput } from '../../components/input/Input.component';
import { AIMessage } from '../../components/message/message.component';
import { BetweenPageAnimation } from '../../index.styles';
import { AIMessageType } from '../../types/message';
import { SendIcon } from '../chat-room/chat-room.style';
import {
    AIAvatarContainer,
    AIicon,
    ChatBody,
    ChatFooter,
    ChatHeader,
    PageContainer,
    UpgradeButton,
} from './AI-helper.style';

const AIHelperPage = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const messages: AIMessageType[] = [
        {
            MessageID: 1,
            AIGenerated: true,
            Content: 'Hello there',
            CreatedAt: '2021-09-10T12:00:00Z',
        },
        {
            MessageID: 2,
            AIGenerated: false,
            Content: 'Hi',
            CreatedAt: '2021-09-10T12:01:00Z',
        },
        {
            MessageID: 3,
            AIGenerated: true,
            Content: 'How can I help you?',
            CreatedAt: '2021-09-10T12:02:00Z',
        },
        {
            MessageID: 1,
            AIGenerated: true,
            Content: 'Hello there',
            CreatedAt: '2021-09-10T12:00:00Z',
        },
        {
            MessageID: 2,
            AIGenerated: false,
            Content: 'Hi',
            CreatedAt: '2021-09-10T12:01:00Z',
        },
        {
            MessageID: 3,
            AIGenerated: true,
            Content: 'How can I help you?',
            CreatedAt: '2021-09-10T12:02:00Z',
        },
        {
            MessageID: 1,
            AIGenerated: true,
            Content: 'Hello there',
            CreatedAt: '2021-09-10T12:00:00Z',
        },
        {
            MessageID: 2,
            AIGenerated: false,
            Content: 'Hi',
            CreatedAt: '2021-09-10T12:01:00Z',
        },
        {
            MessageID: 3,
            AIGenerated: true,
            Content: 'How can I help you?',
            CreatedAt: '2021-09-10T12:02:00Z',
        },
        {
            MessageID: 1,
            AIGenerated: true,
            Content: 'Hello there',
            CreatedAt: '2021-09-10T12:00:00Z',
        },
        {
            MessageID: 2,
            AIGenerated: false,
            Content: 'Hi',
            CreatedAt: '2021-09-10T12:01:00Z',
        },
        {
            MessageID: 3,
            AIGenerated: true,
            Content: 'How can I help you?',
            CreatedAt: '2021-09-10T12:02:00Z',
        },
    ];

    const handleSendMessages = async () => {
        if (message.trim().length === 0) return;
        setMessage('');
        // Send message to the server
    };

    const handlePressingEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessages();
        }
    };

    return (
        <PageContainer {...BetweenPageAnimation} className="mujedd-ai-page">
            <ChatHeader>
                <AIAvatarContainer>
                    <AIicon src={AIimg} />
                    <h1 className="text-lg font-bold text-[var(--slate-700)]">
                        AI Helper
                    </h1>
                </AIAvatarContainer>
                <UpgradeButton
                    select="success"
                    onClick={() => navigate('/app/upgrade')}
                >
                    Upgrade
                </UpgradeButton>
            </ChatHeader>

            <ChatBody>
                {messages.map((message) => (
                    <AIMessage message={message} />
                ))}
            </ChatBody>

            <ChatFooter>
                <CustomInput
                    className="bg-[var(--gray-100)] !border-none focus-visible:!outline-none resize-none"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMessage(e.target.value)
                    }
                    onPressEnter={handlePressingEnter}
                    multiline
                />
                <SendIcon size={26} onClick={handleSendMessages} />
            </ChatFooter>
        </PageContainer>
    );
};
export default AIHelperPage;
