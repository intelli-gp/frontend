import { ElementType, useEffect, useRef, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { SlOptions } from 'react-icons/sl';
import { TbWriting } from 'react-icons/tb';
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
    DefaultPromptCardContainer,
    DefaultPromptsContainer,
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

const DefaultPromptCard = ({
    Icon,
    Prompt,
    HandleClick,
}: {
    Icon: ElementType;
    Prompt: string;
    HandleClick: (prompt: string) => void;
}) => {
    const clickHandler = () => {
        HandleClick(Prompt);
    };
    return (
        <DefaultPromptCardContainer
            onClick={clickHandler}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="w-4">
                <Icon />
            </span>
            <p>{Prompt}</p>
        </DefaultPromptCardContainer>
    );
};

const DefaultPrompts = ({
    isMessagesEmpty,
    defaultPrompts,
    handleClickOnDefaultMessage,
}: {
    isMessagesEmpty: boolean;
    defaultPrompts: { content: string; icon: ElementType }[];
    handleClickOnDefaultMessage: (prompt: string) => void;
}) => {
    console.log('test', isMessagesEmpty);
    if (isMessagesEmpty) return <></>;
    return (
        <DefaultPromptsContainer>
            <h1 className="text-4xl text-center font-bold">Get Started</h1>
            <div className="flex  gap-8 justify-center">
                {defaultPrompts.map((prompt) => (
                    <DefaultPromptCard
                        Icon={prompt.icon}
                        Prompt={prompt.content}
                        HandleClick={handleClickOnDefaultMessage}
                    />
                ))}
            </div>
        </DefaultPromptsContainer>
    );
};

const AIHelperPage = () => {
    const navigate = useNavigate();

    const chatBodyRef = useRef<HTMLDivElement>(null);

    const {
        data: _messages,
        isLoading: messagesIsLoading,
        isFetching: messagesIsFetching,
        error,
    } = useGetAiMessagesQuery();
    const messages = _messages?.data ?? [];

    const [sendAiMessage, { isLoading: messageIsSending }] =
        useSendAiMessageMutation();

    const [message, setMessage] = useState('');
    const [forbiddenModalIsOpen, setForbiddenModalIsOpen] = useState(false);

    const defaultPrompts = [
        {
            content: 'Explain docker containers for a three year old',
            icon: HiAcademicCap,
        },
        {
            content: 'Write a function to reverse a string',
            icon: FaCode,
        },
        {
            content: 'Recite The Raven by Edgar Allan Poe',
            icon: TbWriting,
        },
    ];

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

    const handleDefaultMessagesClicks = async (prompt: string) => {
        try {
            setMessage(prompt);
            await sendAiMessage({ Content: prompt });
        } catch (error) {
            errorToast('Error while sending your default message.');
            console.error(error);
        } finally {
            setMessage('');
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
                {messagesIsLoading ? (
                    <ChatSkeleton />
                ) : (
                    <>
                        {messages.map((message) => (
                            <AIMessage message={message} />
                        ))}
                        <MessageLoading />
                    </>
                )}
                <DefaultPrompts
                    isMessagesEmpty={
                        messagesIsLoading ||
                        messagesIsFetching ||
                        messageIsSending ||
                        messages.length !== 0
                    }
                    defaultPrompts={defaultPrompts}
                    handleClickOnDefaultMessage={handleDefaultMessagesClicks}
                />
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
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessages();
                        }
                    }}
                    disabled={messageIsSending}
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
