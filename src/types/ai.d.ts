import { ReplyMessage } from '../components/message/message.component';
import { ReceivedUser } from './user';

export type AIMessageToSend = {
    Content: string;
};

export type ReceivedAiMessage = {
    Prompt: string;
    Reply: string;
    CreatedAt: string;
    User: Partial<Pick<ReceivedUser, 'Username' | 'ProfileImage'>>;
};
