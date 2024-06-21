import { useEffect, useRef, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

import AIimg from '../../assets/imgs/ai-icon.png';
import { ForbiddenModal } from '../../components/ForbiddenModal';
import Skeleton from '../../components/Skeleton';
import { CustomInput } from '../../components/input/Input.component';
import DropdownMenu from '../../components/menu/menu.component';
import { AIMessage } from '../../components/message/message.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useGetAiMessagesQuery, useSendAiMessageMutation } from '../../store';
import { errorToast } from '../../utils/toasts';
import { GroupName as ChatName, SendIcon } from '../chat-room/chat-room.style';
import { EditButton } from '../view-group/view-group.styles';
import {
    AIAvatarContainer,
    AIicon,
    ChatBody,
    ChatFooter,
    ChatHeader,
    PageContainer,
} from './AI-helper.style';

const ChatSkeleton = () => {
    return Array(10)
        .fill(0)
        .map((_, i) => {
            return (
                <Skeleton
                    key={i}
                    className={`!w-[300px] !h-[100px] !rounded-xl shrink-0 ${
                        i % 2 === 1 ? 'self-start' : 'self-end'
                    }`}
                />
            );
        });
};

const AIHelperPage = () => {
    const navigate = useNavigate();

    const chatBodyRef = useRef<HTMLDivElement>(null);

    const {
        data: _messages,
        isLoading: messagesIsLoading,
        error,
    } = useGetAiMessagesQuery();
    const messages = _messages?.data ?? [];

    const [sendAiMessage, { isLoading: messageIsSending }] =
        useSendAiMessageMutation();

    const [message, setMessage] = useState('');
    const [forbiddenModalIsOpen, setForbiddenModalIsOpen] = useState(false);

    const MessageLoading = () => {
        if (messageIsSending) {
            return (
                <AIMessage
                    isLoading
                    message={{
                        Prompt: message,
                        Reply: '',
                        CreatedAt: new Date().toISOString(),
                        User: {},
                    }}
                />
            );
        } else {
            return <></>;
        }
    };

    const handleSendMessages = async () => {
        if (message.trim().length === 0) return;
        // Send message to the server
        try {
            let Content = message;
            await sendAiMessage({ Content }).unwrap();
        } catch (error) {
            errorToast('Error while sending your message.');
            console.error(error);
        } finally {
            setMessage('');
        }
    };

    useEffect(() => {
        if (error) {
            if ((error as any).status === 403) {
                setForbiddenModalIsOpen(true);
            } else {
                errorToast('Error while fetching messages.');
                console.error(error);
            }
        }
    }, [error]);

    useEffect(() => {
        chatBodyRef?.current?.scrollTo({
            top: chatBodyRef?.current?.scrollHeight,
            behavior: 'instant',
        });
    }, [messageIsSending, messagesIsLoading]);

    useEffect(() => {
        document.title = 'AI Helper | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    return (
        <PageContainer {...BetweenPageAnimation} className="mujedd-ai-page">
            <ChatHeader>
                <AIAvatarContainer>
                    <AIicon src={AIimg} objectFit="cover" />
                    <ChatName>Ai Helper</ChatName>
                </AIAvatarContainer>
                <DropdownMenu
                    right={'50%'}
                    menuWidth={'7.5rem'}
                    options={[
                        {
                            option: 'Upgrade',
                            handler: () => navigate('/app/upgrade'),
                        },
                    ]}
                >
                    <EditButton>
                        <SlOptions size={20} />
                    </EditButton>
                </DropdownMenu>
            </ChatHeader>

            <ChatBody ref={chatBodyRef}>
                {messageIsSending ? (
                    <ChatSkeleton />
                ) : (
                    <>
                        {messages.map((message) => (
                            <AIMessage message={message} />
                        ))}
                        <MessageLoading />
                    </>
                )}
            </ChatBody>

            <ChatFooter>
                <CustomInput
                    className="bg-[var(--gray-100)] !border-none focus-visible:!outline-none resize-none"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMessage(e.target.value)
                    }
                    multiline
                />
                <SendIcon size={26} onClick={handleSendMessages} />
            </ChatFooter>

            <ForbiddenModal
                isOpen={forbiddenModalIsOpen}
                setIsOpen={setForbiddenModalIsOpen}
            />
        </PageContainer>
    );
};
export default AIHelperPage;
