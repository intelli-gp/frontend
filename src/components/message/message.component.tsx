import { ChangeEvent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdDoNotDisturb } from 'react-icons/md';
import { useSelector } from 'react-redux';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { ModalTitle } from '../../index.styles';
import { RootState } from '../../store';
import {
    useDeleteMessageMutation,
    useUpdateMessageMutation,
} from '../../store/apis/messagesApi';
import { SerializedMessage } from '../../types/message';
import Button from '../Button';
import { InputWithoutLabel } from '../Input';
import DropdownMenu from '../Menu/menu.component';
import { Modal } from '../modal/modal.component';
import {
    Message,
    MessageContent,
    MessageDate,
    MessageHeader,
    OptionsButton,
    SenderName,
    SenderProfile,
} from './message.style';

type ChatMessageProps = {
    message: SerializedMessage;
    enableOptions: boolean;
};

const ChatMessage = ({ message, enableOptions }: ChatMessageProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const isMine = message.User.ID === user.ID; // Does this message belongs to me.
    const [editMessageIsOpen, setEditMessageIsOpen] = useState(false);
    const [deleteMessageIsOpen, setDeleteMessageIsOpen] = useState(false);
    const [editMessageText, setEditMessageText] = useState(message.Content);
    const [updateMessage] = useUpdateMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation();

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

    let messageOptions = [
        { option: 'Edit', handler: () => setEditMessageIsOpen(true) },
        { option: 'Delete', handler: () => setDeleteMessageIsOpen(true) },
    ];

    const UpdateMessageModal = (
        <Modal
            isOpen={editMessageIsOpen}
            setIsOpen={setEditMessageIsOpen}
            className="flex flex-col gap-8"
        >
            <ModalTitle fontSize="sm">{`Edit message (${message.MessageID})`}</ModalTitle>
            <InputWithoutLabel
                value={editMessageText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditMessageText(e.target.value)
                }
                multiline
                rows={5}
            />
            <div className="flex gap-4 flex-row-reverse">
                <Button type="button" onClick={handleUpdateMessage}>
                    Save
                </Button>
                <Button
                    type="button"
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
        >
            <ModalTitle fontSize="sm">
                Are you sure you want to delete this message?
            </ModalTitle>
            <div className="flex gap-4 flex-row-reverse">
                <Button
                    type="button"
                    outline
                    select="danger"
                    onClick={handleDeleteMessage}
                >
                    Delete
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setDeleteMessageIsOpen(false);
                    }}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );

    return (
        <Message isMine={isMine}>
            {editMessageIsOpen && UpdateMessageModal}
            {deleteMessageIsOpen && DeleteMessageModal}

            <MessageHeader isMine={isMine}>
                <SenderProfile
                    alt="sender profile image"
                    src={message.User.ProfileImage ?? defaultUserImage}
                />
                <SenderName
                    title={message.User.FullName}
                    isMine={isMine}
                    chars={15}
                >
                    {message.User.FullName}
                </SenderName>
            </MessageHeader>

            {isMine && enableOptions && !message.IsDeleted && (
                <DropdownMenu
                    options={messageOptions}
                    mainElementClassName={`!absolute top-0 right-0`}
                    right='100%'
                    bottom='120%'
                    left='auto'
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

            <MessageContent isMine={isMine} isDeleted={message.IsDeleted}>
                {message.IsDeleted && <MdDoNotDisturb size={18} />}{' '}
                {message.Content}
            </MessageContent>

            <MessageDate isMine={isMine}>
                {new Date(message.CreatedAt ?? Date.now()).toLocaleString()}
            </MessageDate>
        </Message>
    );
};

export default ChatMessage;
