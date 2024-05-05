import Picker, { EmojiStyle } from 'emoji-picker-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { TbUsers } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import EnhancedImage from '../../components/image/image.component';
import { CustomInput as MessageInput } from '../../components/input/Input.component';
import DropdownMenu from '../../components/menu/menu.component';
import ChatMessage, {
    ReplyMessage,
} from '../../components/message/message.component';
import { BetweenPageAnimation } from '../../index.styles';
import { useGetGroupQuery } from '../../store';
import { RootState } from '../../store';
import {
    useGetGroupMessagesQuery,
    useReceiveTypingQuery,
    useSendMessageMutation,
    useSendTypingMutation,
} from '../../store/apis/messagesApi';
import { ReceivedGroup } from '../../types/group';
import { CreateMessageDTO, SerializedMessage } from '../../types/message';
import { profileURL } from '../../utils/profileUrlBuilder';
import { successToast } from '../../utils/toasts';
import { EditButton as HeaderButton } from '../view-group/view-group.styles';
import {
    AttachIcon,
    ChatBody,
    ChatFooter,
    ChatHeader,
    DeleteImg,
    EmojisIcon,
    FooterInputArea,
    GroupImage,
    GroupName,
    GroupTypingStatus,
    GroupUserFullName,
    LeftPart,
    PageContainer,
    RightPart,
    SendIcon,
    StyledBadge,
    UploadImageContainer,
    UserContainer,
    UsersContainer,
} from './chat-room.style';

export const ChatroomPage = () => {
    const { id: groupId } = useParams();
    const navigate = useNavigate();
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const { user } = useSelector((state: RootState) => state.auth);

    const { data: _groupData } = useGetGroupQuery(+groupId!, {
        pollingInterval: 30e3,
    });
    const groupData = _groupData?.data[0] as ReceivedGroup;

    const { data: messages } = useGetGroupMessagesQuery(Number(groupId));
    const [sendMessage] = useSendMessageMutation();
    const [sendTypingStatus] = useSendTypingMutation();
    const { data: typingUsers } = useReceiveTypingQuery();
    const onlineUsers =
        groupData?.GroupMembers?.filter(
            (member) => member.Connected || member.ID === user.ID,
        ) ?? [];

    const offlineUsers =
        groupData?.GroupMembers?.filter(
            (member) => !member.Connected && member.ID !== user.ID,
        ) ?? [];
    const [messageInput, setMessageInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
    const [usersListOpen, setUsersListOpen] = useState(false);
    const [replyingTo, setReplyingTo] = useState<SerializedMessage>();

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setMessageInput((prevInput) => prevInput + emojiObject.emoji);
    };
    const [images, setImages] = useState<string[]>([]);

    const handleSendMessage = async (event?: React.MouseEvent) => {
        event?.preventDefault();
        if (!messageInput.trim()) return;
        setMessageInput('');
        let message: CreateMessageDTO = {
            Content: messageInput,
            Type: 'MESSAGE',
            GroupID: +groupId!,
        };
        if (replyingTo) {
            message.RepliedToMessageID = replyingTo.MessageID;
            setReplyingTo(null!);
        }
        await sendMessage(message).unwrap();
        if (images.length > 0) {
            console.log('I entered');
            images.forEach(async (image) => {
                let message: CreateMessageDTO = {
                    Content: image,
                    Type: 'IMAGE',
                    GroupID: +groupId!,
                };
                await sendMessage(message).unwrap();
            });
            setImages([]);
        }
    };

    const handlePressingEnter = ({ key, shiftKey }: KeyboardEvent) => {
        if (key === 'Enter' && !shiftKey) {
            handleSendMessage();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Debounce mechanism
        setMessageInput(e.target.value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Send to the server telling that I am currently typing.
        sendTypingStatus({
            IsTyping: true,
            GroupID: +groupId!,
        });

        // Send to the server telling that I stopped typing.
        let newTimeout = setTimeout(() => {
            sendTypingStatus({
                IsTyping: false,
                GroupID: +groupId!,
            });
        }, 1e3);

        setTypingTimeout(newTimeout);
    };

    const setAsReplyTarget = (message: SerializedMessage) => {
        setReplyingTo(message);
    };

    const fileInput = useRef<HTMLInputElement>(null);

    const openFileInput = () => {
        fileInput.current?.click();
    };

    const handleImageSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImages((prevImages) => [...prevImages, reader.result as string]);
        };
        reader.readAsDataURL(e.target.files![0]);
    };

    const deleteImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const groupOptions = [
        {
            option: 'View Group',
            handler: () => navigate(`/app/groups/${groupId}`),
        },
        {
            option: 'Copy Link',
            handler: () => {
                navigator.clipboard.writeText(
                    window.location.href.replace('/chat-room', '/groups'),
                );
                successToast('Link copied to clipboard', 'right-bottom');
            },
        },
    ];

    useEffect(() => {
        chatBodyRef?.current?.scrollTo({
            top: chatBodyRef?.current?.scrollHeight,
            behavior: 'instant',
        });
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        const screenClickHandler = () => {
            setUsersListOpen(false);
            setShowPicker(false);
        };
        document.addEventListener('click', screenClickHandler);

        return () => {
            document.removeEventListener('click', screenClickHandler);
        };
    }, []);

    return (
        <PageContainer className="mujedd-chat-room" {...BetweenPageAnimation}>
            <LeftPart>
                <ChatHeader>
                    <GroupImage
                        src={groupData?.GroupCoverImage ?? defaultGroupImage}
                    />
                    <div className="flex flex-col">
                        <GroupName>
                            {groupData?.GroupTitle ?? `Wait i'm loading...`}
                        </GroupName>
                        <GroupTypingStatus>
                            {typingUsers?.length ? (
                                <div className="flex gap-1 items-center">
                                    <BeatLoader
                                        color="var(--gray-800)"
                                        size={6}
                                    />
                                    <span className="font-bold">
                                        {typingUsers?.join(' ,')}
                                    </span>
                                    {` ${
                                        typingUsers.length === 1 ? 'is' : 'are'
                                    }  `}
                                    typing...
                                </div>
                            ) : (
                                <span className="text-[var(--gray-900)]">
                                    Idle
                                </span>
                            )}
                        </GroupTypingStatus>
                    </div>
                    <div className="flex gap-2 ml-auto justify-center">
                        <DropdownMenu
                            options={groupOptions}
                            right="50%"
                            top="100%"
                            left="auto"
                            bottom="auto"
                            menuWidth="10rem"
                        >
                            <HeaderButton title="Group options">
                                <SlOptions size={20} />
                            </HeaderButton>
                        </DropdownMenu>
                        <HeaderButton
                            title="View users"
                            className="lg:!hidden"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setUsersListOpen(true);
                            }}
                        >
                            <TbUsers size={20} />
                        </HeaderButton>
                    </div>
                </ChatHeader>

                <ChatBody ref={chatBodyRef}>
                    {messages?.map((message) => (
                        <ChatMessage
                            setAsReplayTarget={setAsReplyTarget}
                            key={message.MessageID}
                            enableOptions
                            message={message}
                        />
                    ))}
                </ChatBody>

                <ChatFooter>
                    {showPicker && (
                        <div
                            className="absolute bottom-[110%] left-0 z-10"
                            onClick={(event: React.MouseEvent) =>
                                event.stopPropagation()
                            }
                        >
                            <Picker
                                onEmojiClick={onEmojiClick}
                                emojiStyle={EmojiStyle.FACEBOOK}
                            />
                        </div>
                    )}
                    {replyingTo && (
                        <ReplyMessage
                            isImage={replyingTo.Type === 'IMAGE'}
                            {...replyingTo}
                            closeButtonHandler={() => setReplyingTo(null!)}
                        />
                    )}
                    <FooterInputArea>
                        <div className="flex items-center">
                            <EmojisIcon
                                size={20}
                                onClick={(event: React.MouseEvent) => {
                                    event.stopPropagation();
                                    setShowPicker(!showPicker);
                                }}
                            />
                            <span onClick={openFileInput}>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    onChange={handleImageSelection}
                                    hidden
                                />
                                <AttachIcon size={20} />
                            </span>
                        </div>
                        <div className="flex flex-col flex-1 max-h-[135px] p-[4px] bg-[var(--gray-100)] !border-none focus-visible:!outline-none rounded-md">
                            {images && (
                                <div className="flex gap-2 justify-start items-center">
                                    {images.map((image, index) => (
                                        <div
                                            className="relative p-2 "
                                            key={index}
                                        >
                                            <DeleteImg
                                                onClick={() =>
                                                    deleteImage(index)
                                                }
                                            />
                                            <UploadImageContainer src={image} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <MessageInput
                                className="bg-[var(--gray-100)] !border-none focus-visible:!outline-none resize-none"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={handleInputChange}
                                onKeyPress={handlePressingEnter}
                            />
                        </div>
                        <SendIcon
                            title="Send message"
                            size={20}
                            onClick={handleSendMessage}
                        />
                    </FooterInputArea>
                </ChatFooter>
            </LeftPart>
            <RightPart className={`${usersListOpen && 'open'}`}>
                <UsersContainer>
                    <h1 className="font-bold">
                        ONLINE USERS ({onlineUsers.length ?? 0})
                    </h1>
                    {onlineUsers.map((person) => (
                        <UserContainer
                            key={person.ID}
                            onClick={() => {
                                navigate(profileURL(person.Username));
                            }}
                        >
                            <EnhancedImage
                                className="!w-[48px] !h-[48px] rounded-full object-cover aspect-square"
                                alt="username"
                                src={person?.ProfileImage ?? defaultUserImage}
                            />
                            <div className="overflow-hidden flex flex-col">
                                <GroupUserFullName
                                    to={profileURL(person.Username)}
                                    title={person.FullName}
                                >
                                    {person.FullName}
                                </GroupUserFullName>
                                <div className="flex gap-1 items-center">
                                    <StyledBadge online={true} />
                                    <p className="text-xs text-[var(--gray-600)]">
                                        online
                                    </p>
                                </div>
                            </div>
                        </UserContainer>
                    ))}
                    <h1 className="mt-8 font-bold">
                        OFFLINE USERS ({offlineUsers.length ?? 0})
                    </h1>
                    {offlineUsers.map((person) => (
                        <UserContainer
                            key={person.ID}
                            onClick={() => {
                                navigate(profileURL(person.Username));
                            }}
                        >
                            <EnhancedImage
                                className="!w-[48px] !h-[48px] rounded-full object-cover aspect-square"
                                alt="username"
                                src={person?.ProfileImage ?? defaultUserImage}
                            />
                            <div className="overflow-hidden">
                                <GroupUserFullName
                                    title={person.FullName}
                                    to={profileURL(person.Username)}
                                >
                                    {person.FullName}
                                </GroupUserFullName>
                                <div className="flex flex-row gap-1 items-center">
                                    <StyledBadge online={false} />
                                    <p className="text-xs text-[var(--gray-600)]">
                                        offline
                                    </p>
                                </div>
                            </div>
                        </UserContainer>
                    ))}
                </UsersContainer>
            </RightPart>
        </PageContainer>
    );
};

export default ChatroomPage;
