import { IoSend } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import AIimg from '../../assets/imgs/AI-profile.svg';
import { InputWithoutLabel } from '../../components/Input';
import Button from '../../components/button/button.component';
import {
    AIicon,
    ChatBody,
    ChatBox,
    ChatFooter,
    ChatHeader,
    Message,
    Messagebar,
    PageContainer,
} from './AI-helper.style';

type MessageType = {
    type: string;
    message: string;
    incoming: boolean;
    date: string;
};

const TextMsg = ({ el }: { el: MessageType }) => {
    return (
        <ChatBox incoming={el.incoming}>
            <Message incoming={el.incoming}>
                <p>{el.message}</p>
                <span>{el.date}</span>
            </Message>
        </ChatBox>
    );
};

const AIHelperPage = () => {
    const navigate = useNavigate();

    const data1 = [
        {
            type: 'msg',
            message: 'HI, how are you?',
            incoming: true,
            date: '10/16/2023, 10:51:23 AM ',
        },
        {
            type: 'msg',
            message: 'Thanks for asking! I am fine and u?',
            incoming: false,
            date: '10/16/2023, 10:51:23 AM ',
        },
        {
            type: 'msg',
            message:
                'I am great, Can you come to work today? I am great, Can you come to work today? I am great, Can you come to work today?',
            incoming: true,
            date: '10/16/2023, 10:51:23 AM ',
        },
    ];

    return (
        <PageContainer>
            <ChatHeader>
                <span className="flex flex-row gap-4 items-center">
                    <AIicon src={AIimg} />
                    <h1 className="text-lg font-bold text-[var(--slate-700)]">
                        AI Helper
                    </h1>
                </span>
                <Button
                    type="button"
                    select="secondary"
                    className="!text-[#312E81] !text-xs !h-[38px] !w-[80px]"
                    onClick={() => navigate('/app/upgrade')}
                >
                    Upgrade
                </Button>
            </ChatHeader>
            <div className="flex flex-col md:px-[120px] px-[50px] h-[calc(100vh-70px)]">
                <ChatBody>
                    <div />
                    {data1.map((text) => (
                        <TextMsg el={text} />
                    ))}
                </ChatBody>
                <ChatFooter>
                    <Messagebar>
                        <InputWithoutLabel
                            className="shadow-none bg-[var(--slate-100)] border-none "
                            placeholder="Type a message..."
                        />
                        <IoSend color="var(--indigo-800)" size={26} />
                    </Messagebar>
                </ChatFooter>
            </div>
        </PageContainer>
    );
};
export default AIHelperPage;
