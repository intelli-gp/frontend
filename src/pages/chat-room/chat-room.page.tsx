import { faker } from '@faker-js/faker';
import Picker from 'emoji-picker-react';
import { SetStateAction, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { LuPaperclip } from 'react-icons/lu';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

import defaultUserImage from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputWithoutLabel } from '../../components/Input';
import {
    ChatBody,
    ChatBox,
    ChatFooter,
    ChatHeader,
    GroupIcon,
    LeftPart,
    PageContainer,
    RightPart,
    StyledBadge,
    UserContainer,
    UsersContainer,
} from './chat-room.style';

type MessageType = {
    type: string;
    message: string;
    incoming: boolean;
    outgoing: boolean;
    date: string;
    name: string;
    img: string;
};

const TextMsg = ({ el }: { el: MessageType }) => {
    return (
        <ChatBox incoming={el.incoming}>
            <div>
                <div className="flex flex-row gap-2 items-center">
                    <img src={el.img} />
                    <h1 className="text-xs text-[var(--slate-600)]">
                        {el.name}
                    </h1>
                </div>
                <p>{el.message}</p>
                <span>{el.date}</span>
            </div>
        </ChatBox>
    );
};

export const ChatroomPage = () => {
    const data1 = [
        {
            type: 'msg',
            message: 'HI, how are you?',
            incoming: true,
            outgoing: false,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
        {
            type: 'msg',
            message: 'Thanks for asking! I am fine and u?',
            incoming: false,
            outgoing: true,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
        {
            type: 'msg',
            message: 'I am great, Can you come to work today?',
            incoming: true,
            outgoing: false,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
        {
            type: 'img',
            preview: faker.image.avatar(),
            message: 'Yep, I can do that',
            incoming: false,
            outgoing: true,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
        {
            type: 'msg',
            message: 'I am great, Can you come to work today?',
            incoming: true,
            outgoing: false,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
        {
            type: 'img',
            preview: faker.image.avatar(),
            message: 'Yep, I can do that',
            incoming: false,
            outgoing: true,
            date: '10/16/2023, 10:51:23 AM ',
            name: 'John Salah',
            img: defaultUserImage,
        },
    ];
    const groupImg =
        'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const data = [
        {
            name: 'Youmna Mahmoud',
            online: true,
            img: defaultUserImage,
        },
        {
            name: 'Youmna Mahmoud',
            online: true,
            img: defaultUserImage,
        },
        {
            name: 'Youmna Mahmoud',
            online: true,
            img: defaultUserImage,
        },
        {
            name: 'Youmna Mahmoud',
            online: false,
            img: defaultUserImage,
        },
        {
            name: 'Youmna Mahmoud',
            online: false,
            img: defaultUserImage,
        },
    ];
    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <PageContainer>
            <LeftPart>
                <ChatHeader>
                    <span className="flex flex-row gap-4 items-center">
                        <GroupIcon src={groupImg} />
                        <h1 className="text-lg font-bold text-[var(--slate-700)]">
                            Computer Hackers
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
                <ChatBody>
                    <div />
                    {data1.map((text) => (
                        <TextMsg el={text} />
                    ))}
                </ChatBody>
                <ChatFooter>
                    <span className="flex gap-2 relative">
                        {showPicker && (
                            <div className="absolute top-[-1700%]">
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                        <MdOutlineEmojiEmotions
                            color="var(--indigo-800)"
                            size={28}
                            onClick={() => setShowPicker((val) => !val)}
                        />
                        <LuPaperclip color="var(--indigo-800)" size={26} />
                    </span>
                    <InputWithoutLabel
                        className="shadow-none bg-[var(--slate-100)] border-none "
                        placeholder="Type a message..."
                        value={inputStr}
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => setInputStr(e.target.value)}
                    />
                    <IoSend color="var(--indigo-800)" size={26} />
                </ChatFooter>
            </LeftPart>
            <RightPart>
                <UsersContainer>
                    <h1>ONLINE USERS</h1>
                    {data
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
                        ))}
                    <h1>OFFLINE USERS</h1>
                    {data
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
                        ))}
                </UsersContainer>
            </RightPart>
        </PageContainer>
    );
};
