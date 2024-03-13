import Picker from 'emoji-picker-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { LuPaperclip } from 'react-icons/lu';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import defaultGroupImage from '../../assets/imgs/default-group-image.jpg';
import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputWithoutLabel } from '../../components/Input';
import { useGetGroupQuery } from '../../store';
import { RootState } from '../../store';
import {
    useGetGroupMessagesQuery,
    useSendMessageMutation,
} from '../../store/apis/messagesApi';
import { ReceivedGroup } from '../../types/group';
import { SerializedMessage } from '../../types/message';
import { Response } from '../../types/response';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    GroupIcon,
    LeftPart,
    Message,
    PageContainer,
    RightPart,
    StyledBadge,
    UserContainer,
    UsersContainer,
} from './chat-room.style';

const TextMsg = (message: SerializedMessage) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const incoming = message.User.ID === user.ID; // Does this message belongs to me.

    return (
        <Message incoming={incoming}>
            <div>
                <div className="flex flex-row gap-2 items-center">
                    <img
                        alt="sender profile image"
                        src={message.User.ProfileImage ?? defaultUserImage}
                        className="object-cover"
                    />
                    <h1 className="text-xs text-[var(--slate-600)]">
                        {message.User.FullName}
                    </h1>
                </div>
                <p>{message.Content}</p>
                <span>
                    {new Date(message.CreatedAt ?? Date.now()).toLocaleString()}
                </span>
            </div>
        </Message>
    );
};

export const ChatroomPage = () => {
    const { id: groupId } = useParams();
    const chatBodyRef = useRef<HTMLDivElement>(null);

    const { data: _groupData } = useGetGroupQuery(+groupId!);
    const groupData = (_groupData as unknown as Response)
        ?.data[0] as ReceivedGroup;

    const { data: _messages } = useGetGroupMessagesQuery(Number(groupId));
    const messages = _messages as SerializedMessage[];

    const [sendMessage] = useSendMessageMutation();

    // const groupUsers = [
    //     {
    //         name: 'Youmna Mahmoud',
    //         online: true,
    //         img: defaultUserImage,
    //     },
    //     {
    //         name: 'Youmna Mahmoud',
    //         online: true,
    //         img: defaultUserImage,
    //     },
    //     {
    //         name: 'Youmna Mahmoud',
    //         online: true,
    //         img: defaultUserImage,
    //     },
    //     {
    //         name: 'Youmna Mahmoud',
    //         online: false,
    //         img: defaultUserImage,
    //     },
    //     {
    //         name: 'Youmna Mahmoud',
    //         online: false,
    //         img: defaultUserImage,
    //     },
    // ];

    const [messageInput, setMessageInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setMessageInput((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim()) return;
        setMessageInput('');
        await sendMessage({
            Content: messageInput,
            GroupID: +groupId!,
        }).unwrap();
    };

    /**
     * The dependency list is skipped deliberately
     * for this function to run on every render.
     */
    useEffect(() => {
        chatBodyRef?.current?.scrollTo({
            top: chatBodyRef?.current?.scrollHeight,
            behavior: 'instant',
        });
    });

    return (
        <PageContainer>
            <LeftPart>
                <ChatHeader>
                    <span className="flex flex-row gap-4 items-center">
                        <GroupIcon
                            src={
                                groupData?.GroupCoverImage ?? defaultGroupImage
                            }
                        />
                        <h1 className="text-lg font-bold text-[var(--gray-700)]">
                            {groupData?.GroupTitle ?? 'Loading...'}
                        </h1>
                    </span>
                    <Button
                        type="button"
                        select="primary300"
                        className="h-[32px] w-[70px] text-[var(--indigo-900)]"
                    >
                        Invite
                    </Button>
                </ChatHeader>
                <ChatBody ref={chatBodyRef}>
                    <div />
                    {messages?.map((message) => (
                        <TextMsg key={message.MessageID} {...message} />
                    ))}
                </ChatBody>
                <ChatFooter>
                    <span className="flex gap-1 relative">
                        {showPicker && (
                            <div className="absolute bottom-[150%]">
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                        <MdOutlineEmojiEmotions
                            className="fill-[var(--indigo-800)] cursor-pointer box-content p-2 bg-indigo-50 rounded-full hover:bg-indigo-100"
                            size={28}
                            onClick={() => setShowPicker((val) => !val)}
                        />
                        <LuPaperclip
                            color="var(--indigo-800)"
                            className="cursor-pointer box-content p-2 bg-indigo-50 rounded-full hover:bg-indigo-100"
                            size={26}
                        />
                    </span>
                    <InputWithoutLabel
                        className="shadow-none bg-[var(--slate-100)] border-none "
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setMessageInput(e.target.value);
                        }}
                    />
                    <IoSend
                        title="Send message"
                        className="fill-[var(--indigo-800)] cursor-pointer box-content p-2 bg-indigo-50 rounded-full hover:bg-indigo-100"
                        size={26}
                        onClick={handleSendMessage}
                    />
                </ChatFooter>
            </LeftPart>

            <RightPart>
                <UsersContainer>
                    <h1>ONLINE USERS</h1>
                    {/* {groupUsers
                        .filter((person) => person.online)
                        .map((person) => (
                            <UserContainer>
                                <img
                                    alt="username"
                                    src={person?.img ?? defaultUserImage}
                                />
                                <span>
                                    <h2 className="text-[12px] ">
                                        {person.name}
                                    </h2>
                                    <div className="flex flex-row gap-[6px] items-center">
                                        <StyledBadge online={true} />
                                        <p className="text-xs text-[var(--slate-500)]">
                                            online
                                        </p>
                                    </div>
                                </span>
                            </UserContainer>
                        ))} */}
                    <h1>OFFLINE USERS</h1>
                    {/* {groupUsers
                        .filter((person) => !person.online)
                        .map((person) => (
                            <UserContainer>
                                <img
                                    alt="username"
                                    src={person?.img ?? defaultUserImage}
                                />
                                <span>
                                    <h1 className="text-[13px]">
                                        {person.name}
                                    </h1>
                                    <div className="flex flex-row gap-[6px] items-center">
                                        <StyledBadge online={false} />
                                        <p className="text-xs text-[var(--slate-500)]">
                                            offline
                                        </p>
                                    </div>
                                </span>
                            </UserContainer>
                        ))} */}
                </UsersContainer>
            </RightPart>
        </PageContainer>
    );
};
