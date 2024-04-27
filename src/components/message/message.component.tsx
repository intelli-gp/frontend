import { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdDoNotDisturb } from 'react-icons/md';
import { useSelector } from 'react-redux';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { RootState } from '../../store';
import {
    useDeleteMessageMutation,
    useLazyGetMessageInfoQuery,
    useUpdateMessageMutation,
} from '../../store/apis/messagesApi';
import { MessageInfo, SerializedMessage } from '../../types/message';
import Button from '../button/button.component';
import { CustomInput } from '../input/Input.component';
import DropdownMenu from '../menu/menu.component';
import { Modal } from '../modal/modal.component';
import UserItem from '../user-Item/user-item.component';
import {
    Message,
    MessageContent,
    MessageDate,
    MessageHeader,
    MessageInfoModalContainer,
    MessageInfoReadContainer,
    MessageInfoSectionLabel,
    MessageInfoUsersList,
    OptionsButton,
    SenderName,
    SenderProfile,
} from './message.style';

type ChatMessageProps = {
    message: SerializedMessage;
    /**
     * Enable options for message like edit, delete, info.
     * @default true
     */
    enableOptions?: boolean;
    /**
     * className for the message container.
     */
    className?: string;
};

const ChatMessage = ({
    message,
    enableOptions = true,
    className,
}: ChatMessageProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const isMine = message.User.ID === user.ID; // Does this message belongs to me.
    const [editMessageIsOpen, setEditMessageIsOpen] = useState(false);
    const [deleteMessageIsOpen, setDeleteMessageIsOpen] = useState(false);
    const [messageInfoIsOpen, setMessageInfoIsOpen] = useState(false);
    const [editMessageText, setEditMessageText] = useState(message.Content);
    const [updateMessage] = useUpdateMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation();
    const [getMessageInfo, { data: messageInfo }] =
        useLazyGetMessageInfoQuery();

    const handleUpdateMessage = async () => {
        try {
            if (editMessageText === message.Content) return;
            console.log(editMessageText);
            await updateMessage({
                MessageID: message.MessageID,
                Content: editMessageText,
            }).unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            setEditMessageIsOpen(false);
            setEditMessageText(message.Content);
        }
    };

    const handleDeleteMessage = async () => {
        try {
            await deleteMessage({ MessageID: message.MessageID }).unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteMessageIsOpen(false);
        }
    };

    const handleGetMessageInfo = async () => {
        setMessageInfoIsOpen(true);
        await getMessageInfo(message.MessageID).unwrap();
    };

    const messageInfoModalCleanup = async () => {
        getMessageInfo(message.MessageID).unsubscribe();
    };

    let messageOptions = [
        { option: 'Edit', handler: () => setEditMessageIsOpen(true) },
        { option: 'Delete', handler: () => setDeleteMessageIsOpen(true) },
        { option: 'Info', handler: handleGetMessageInfo },
    ];

    const UpdateMessageModal = (
        <Modal
            isOpen={editMessageIsOpen}
            setIsOpen={setEditMessageIsOpen}
            title={`Edit message (${message.MessageID})`}
        >
            <ChatMessage
                message={message}
                enableOptions={false}
                className="!max-w-full w-full"
            />
            <CustomInput
                value={editMessageText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditMessageText(e.target.value)
                }
                multiline
                rows={5}
            />
            <div className="flex gap-4 flex-row-reverse">
                <Button onClick={handleUpdateMessage}>Save</Button>
                <Button
                    outline
                    select="danger"
                    onClick={() => {
                        setEditMessageIsOpen(false);
                        setEditMessageText(message.Content);
                    }}
                >
                    Discard
                </Button>
            </div>
        </Modal>
    );

    const DeleteMessageModal = (
        <Modal
            isOpen={deleteMessageIsOpen}
            setIsOpen={setDeleteMessageIsOpen}
            className="flex flex-col gap-8"
            title={'Are you sure you want to delete this message?'}
        >
            <div className="flex gap-4 justify-center">
                <Button outline select="danger" onClick={handleDeleteMessage}>
                    Delete
                </Button>
                <Button
                    onClick={() => {
                        setDeleteMessageIsOpen(false);
                    }}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );

    const MessageInfoModal = (
        <Modal
            isOpen={messageInfoIsOpen}
            setIsOpen={setMessageInfoIsOpen}
            cleanupFn={messageInfoModalCleanup}
            title={`Message Info ${message.MessageID}`}
        >
            <ChatMessage
                message={message}
                enableOptions={false}
                className="!max-w-full w-full mb-4"
            />

            <MessageInfoModalContainer>
                <MessageInfoReadContainer>
                    <MessageInfoSectionLabel>Read by</MessageInfoSectionLabel>
                    <MessageInfoUsersList>
                        {(messageInfo as MessageInfo[])?.map(
                            (info: MessageInfo) => {
                                return (
                                    <UserItem
                                        key={info.UserID}
                                        FullName={info.FullName}
                                        ProfileImage={info.ProfileImage}
                                        Username={info.Username}
                                        timeInfo={info.ReadAt}
                                    />
                                );
                            },
                        )}
                    </MessageInfoUsersList>
                </MessageInfoReadContainer>
            </MessageInfoModalContainer>
        </Modal>
    );

    return (
        <Message isMine={isMine} className={className || ''}>
            {UpdateMessageModal}
            {DeleteMessageModal}
            {MessageInfoModal}

            <MessageHeader isMine={isMine}>
                <SenderProfile
                    alt="sender profile image"
                    src={message.User.ProfileImage ?? defaultUserImage}
                />
                <SenderName
                    title={message.User.FullName}
                    isMine={isMine}
                    width={'90%'}
                >
                    {message.User.FullName}
                </SenderName>
            </MessageHeader>

            {isMine && enableOptions && !message.IsDeleted && (
                <DropdownMenu
                    options={messageOptions}
                    mainElementClassName={`!absolute top-0 right-0`}
                    right="100%"
                    top="10%"
                    left="auto"
                    menuWidth="8rem"
                >
                    <OptionsButton
                        title={'Options'}
                        className={'options-button'}
                    >
                        <IoIosArrowDown size={18} />
                    </OptionsButton>
                </DropdownMenu>
            )}

            <MessageContent
                isMine={isMine}
                isDeleted={message.IsDeleted}
                dir="auto"
            >
                {message.IsDeleted && <MdDoNotDisturb size={18} />}
                {message.Content}
            </MessageContent>

            <MessageDate isMine={isMine}>
                {new Date(message.CreatedAt ?? Date.now()).toLocaleString()}
            </MessageDate>
        </Message>
    );
};

export default ChatMessage;
