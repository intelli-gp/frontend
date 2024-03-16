import Picker from 'emoji-picker-react';
import {
    ChangeEvent,
    FormEvent,
    MouseEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';
import { IoSend } from 'react-icons/io5';
import { LuPaperclip } from 'react-icons/lu';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import { InputWithoutLabel } from '../../components/Input';
import DropdownMenu from '../../components/Menu/menu.component';
import ChatMessage from '../../components/message/message.component';
import { useGetGroupQuery } from '../../store';
import { RootState } from '../../store';
import {
    useGetGroupMessagesQuery,
    useReceiveTypingQuery,
    useSendMessageMutation,
    useSendTypingMutation,
} from '../../store/apis/messagesApi';
import { ReceivedGroup } from '../../types/group';
import { SerializedMessage } from '../../types/message';
import { Response } from '../../types/response';
import { successToast } from '../../utils/toasts';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    EditButton,
    GroupImage,
    GroupName,
    GroupTypingStatus,
    GroupUserFullName,
    LeftPart,
    PageContainer,
    RightPart,
    StyledBadge,
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
    const groupData = (_groupData as unknown as Response)
        ?.data[0] as ReceivedGroup;

    const { data: _messages } = useGetGroupMessagesQuery(Number(groupId));
    const messages = _messages as SerializedMessage[];

    const [sendMessage] = useSendMessageMutation();
    const [sendTypingStatus] = useSendTypingMutation();
    const { data: _typingUsers } = useReceiveTypingQuery();
    const typingUsers = _typingUsers as string[];

    const onlineUsers =
        groupData?.GroupMembers?.filter(
            (member) => member.ConnectedStatus || member.ID === user.ID,
        ) ?? [];

    const offlineUsers =
        groupData?.GroupMembers?.filter(
            (member) => !member.ConnectedStatus && member.ID !== user.ID,
        ) ?? [];

    const [messageInput, setMessageInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setMessageInput((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (!messageInput.trim()) return;
        setMessageInput('');
        await sendMessage({
            Content: messageInput,
            GroupID: +groupId!,
        }).unwrap();
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
        }, 5e3);

        setTypingTimeout(newTimeout);
    };

    const groupOptions = [
        {
            option: 'View Group',
            handler: () => navigate(`/app/groups/${groupId}`),
        },
        {
            option: 'Copy Link',
            handler: () => {
                successToast('Link copied to clipboard', 'right-bottom');
            },
        },
    ];

    useEffect(() => {
        chatBodyRef?.current?.scrollTo({
            top: chatBodyRef?.current?.scrollHeight,
            behavior: 'instant',
        });
    }, [_messages]);

    return (
        <PageContainer>
            <div className="my-0 mx-auto max-w-[1200px] w-full flex gap-4">
                <LeftPart>
                    <ChatHeader>
                        <GroupImage
                            src={
                                groupData?.GroupCoverImage ?? defaultGroupImage
                            }
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
                                            typingUsers.length === 1
                                                ? 'is'
                                                : 'are'
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
                        <DropdownMenu
                            options={groupOptions}
                            mainElementClassName="ml-auto"
                            right="50%"
                            top="100%"
                            left="auto"
                            bottom="auto"
                            menuWidth="10rem"
                        >
                            <EditButton>
                                <SlOptions size={20} />
                            </EditButton>
                        </DropdownMenu>
                    </ChatHeader>
                    <ChatBody ref={chatBodyRef}>
                        <div />
                        {messages?.map((message) => (
                            <ChatMessage
                                key={message.MessageID}
                                enableOptions
                                message={message}
                            />
                        ))}
                    </ChatBody>
                    <ChatFooter>
                        {showPicker && (
                            <div className="absolute bottom-[110%] left-0">
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                        <MdOutlineEmojiEmotions
                            className="fill-[var(--indigo-800)] cursor-pointer box-content p-2 rounded-full hover:bg-indigo-100"
                            size={24}
                            onClick={() => setShowPicker(!showPicker)}
                        />
                        <LuPaperclip
                            color="var(--indigo-800)"
                            className="cursor-pointer box-content p-2 rounded-full hover:bg-indigo-100"
                            size={24}
                        />
                        <form
                            className="flex gap-2 flex-1"
                            onSubmit={handleSendMessage}
                        >
                            <InputWithoutLabel
                                className="bg-[var(--slate-100)] border-none "
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={handleInputChange}
                            />
                        </form>
                        <IoSend
                            title="Send message"
                            className="fill-[var(--indigo-800)] cursor-pointer box-content p-2  rounded-full hover:bg-indigo-100"
                            size={24}
                            onClick={
                                handleSendMessage as unknown as MouseEventHandler
                            }
                        />
                    </ChatFooter>
                </LeftPart>

                <RightPart>
                    <UsersContainer>
                        <h1>ONLINE USERS</h1>
                        {onlineUsers.map((person) => (
                            <UserContainer>
                                <img
                                    className="object-cover"
                                    alt="username"
                                    src={
                                        person?.ProfileImage ?? defaultUserImage
                                    }
                                />
                                <span>
                                    <GroupUserFullName title={person.FullName}>
                                        {person.FullName}
                                    </GroupUserFullName>
                                    <div className="flex flex-row gap-[6px] items-center">
                                        <StyledBadge online={true} />
                                        <p className="text-xs text-[var(--slate-500)]">
                                            online
                                        </p>
                                    </div>
                                </span>
                            </UserContainer>
                        ))}
                        <h1 className="mt-8">OFFLINE USERS</h1>
                        {offlineUsers.map((person) => (
                            <UserContainer>
                                <img
                                    alt="username"
                                    src={
                                        person?.ProfileImage ?? defaultUserImage
                                    }
                                    className="object-cover"
                                />
                                <span>
                                    <GroupUserFullName title={person.FullName}>
                                        {person.FullName}
                                    </GroupUserFullName>
                                    <div className="flex flex-row gap-[6px] items-center">
                                        <StyledBadge online={false} />
                                        <p className="text-xs text-[var(--slate-500)]">
                                            offline
                                        </p>
                                    </div>
                                </span>
                            </UserContainer>
                        ))}
                    </UsersContainer>
                </RightPart>
            </div>
        </PageContainer>
    );
};
