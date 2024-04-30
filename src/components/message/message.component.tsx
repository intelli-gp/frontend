import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdDoNotDisturb } from 'react-icons/md';
import { useSelector } from 'react-redux';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { RootState } from '../../store';
import {
    useDeleteMessageMutation,
    useLazyGetMessageInfoQuery,
    useReactToMessageMutation,
    useUpdateMessageMutation,
} from '../../store/apis/messagesApi';
import { MessageInfo, SerializedMessage } from '../../types/message';
import { profileURL } from '../../utils/profileUrlBuilder';
import Button from '../button/button.component';
import { CustomInput } from '../input/Input.component';
import DropdownMenu from '../menu/menu.component';
import { Modal } from '../modal/modal.component';
import UserItem from '../user-Item/user-item.component';
import {
    EmojisContainer,
    EmojisCounter,
    Message,
    MessageContent,
    MessageDate,
    MessageHeader,
    MessageInfoModalContainer,
    MessageInfoReadContainer,
    MessageInfoSectionLabel,
    MessageInfoUsersList,
    MessageReactions,
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

    /**
     * Show reactions to the message.
     */
    showReactions?: boolean;
};

const ChatMessage = ({
    message,
    enableOptions = true,
    className,
    showReactions = true,
}: ChatMessageProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const isMine = message.User.ID === user.ID; // Does this message belongs to me.
    const hasReactions = !!message.Reactions?.length;

    const [editMessageIsOpen, setEditMessageIsOpen] = useState(false);
    const [deleteMessageIsOpen, setDeleteMessageIsOpen] = useState(false);
    const [messageInfoIsOpen, setMessageInfoIsOpen] = useState(false);
    const [reactMessageIsOpen, setReactMessageIsOpen] = useState(false);
    const [viewReactionsIsOpen, setViewReactionsIsOpen] = useState(false);
    const [editMessageText, setEditMessageText] = useState(message.Content);
    const [updateMessage] = useUpdateMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation();
    const [getMessageInfo, { data: messageInfo }] =
        useLazyGetMessageInfoQuery();
    const [reactToMessage] = useReactToMessageMutation();

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

    const handleReactToMessage = async (emoji: EmojiClickData) => {
        try {
            await reactToMessage({
                MessageID: message.MessageID,
                Reaction: emoji.emoji,
            }).unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            setReactMessageIsOpen(false);
        }
    };

    const getMessageOptions = () => {
        let options = [
            { option: 'React', handler: () => setReactMessageIsOpen(true) },
        ];
        if (isMine) {
            options.push(
                { option: 'Edit', handler: () => setEditMessageIsOpen(true) },
                {
                    option: 'Delete',
                    handler: () => setDeleteMessageIsOpen(true),
                },
                { option: 'Info', handler: handleGetMessageInfo },
            );
        }
        return options;
    };

    const messageReactions = useMemo(() => {
        if (!message?.Reactions) return;
        let reactions = new Set<string>();
        message.Reactions.forEach((reaction) => {
            reactions.add(reaction.Reaction);
        });
        return {
            reactions: Array.from(reactions).join(''),
            count: message.Reactions.length,
        };
    }, [message]);

    const UpdateMessageModal = (
        <Modal
            isOpen={editMessageIsOpen}
            setIsOpen={setEditMessageIsOpen}
            title={`Edit message`}
        >
            <ChatMessage
                message={message}
                enableOptions={false}
                className="!max-w-full w-full"
                showReactions={false}
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
            width="sm"
            isOpen={messageInfoIsOpen}
            setIsOpen={setMessageInfoIsOpen}
            cleanupFn={messageInfoModalCleanup}
            title={`Message Info`}
        >
            <ChatMessage
                message={message}
                enableOptions={false}
                className="!max-w-full w-full mb-4"
                showReactions={false}
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

    const ReactToMessageModal = (
        <Modal
            isOpen={reactMessageIsOpen}
            setIsOpen={setReactMessageIsOpen}
            title={`React to message`}
        >
            <EmojiPicker
                onEmojiClick={handleReactToMessage}
                width="100%"
                lazyLoadEmojis={true}
                emojiStyle={EmojiStyle.FACEBOOK}
                reactionsDefaultOpen={true}
                skinTonesDisabled={true}
            />
        </Modal>
    );

    const ViewReactionsModal = (
        <Modal
            width="sm"
            isOpen={viewReactionsIsOpen}
            setIsOpen={setViewReactionsIsOpen}
            title={`Reactions on message`}
        >
            <ChatMessage
                message={message}
                enableOptions={false}
                className="!max-w-full w-full"
                showReactions={false}
            />
            <MessageInfoReadContainer>
                <MessageInfoSectionLabel>
                    ({messageReactions?.count ?? 0}) Reactions by
                </MessageInfoSectionLabel>
                <MessageInfoUsersList>
                    {message.Reactions?.map((reaction) => (
                        <li key={reaction.User.ID}>
                            <UserItem
                                FullName={reaction.User.FullName}
                                Username={reaction.User.Username}
                                ProfileImage={reaction.User.ProfileImage}
                                emoji={reaction.Reaction}
                            />
                        </li>
                    ))}
                </MessageInfoUsersList>
            </MessageInfoReadContainer>
        </Modal>
    );

    return (
        <Message
            isMine={isMine}
            className={className || ''}
            hasReactions={hasReactions}
            showReactions={showReactions}
        >
            {UpdateMessageModal}
            {DeleteMessageModal}
            {MessageInfoModal}
            {ReactToMessageModal}
            {ViewReactionsModal}

            <MessageHeader isMine={isMine}>
                <SenderProfile
                    alt="sender profile image"
                    src={message.User.ProfileImage ?? defaultUserImage}
                />
                <SenderName
                    to={profileURL(message.User.Username)}
                    title={`view ${message.User.FullName}'s profile`}
                    isMine={isMine}
                    width={'90%'}
                >
                    {message.User.FullName}
                </SenderName>
            </MessageHeader>

            {enableOptions && !message.IsDeleted && (
                <DropdownMenu
                    options={getMessageOptions()}
                    mainElementClassName={`!absolute top-0 right-0`}
                    right={`${isMine ? '50%' : 'auto'}`}
                    top="65%"
                    left={`${isMine ? 'auto%' : '50%'}`}
                    menuWidth="8rem"
                >
                    <OptionsButton
                        isMine={isMine}
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

            {showReactions && hasReactions && (
                <MessageReactions
                    isMine={isMine}
                    title="View who reacted."
                    onClick={() => setViewReactionsIsOpen(true)}
                >
                    <EmojisContainer>
                        {messageReactions?.reactions}
                    </EmojisContainer>
                    {(messageReactions?.count ?? 0 > 1) && (
                        <EmojisCounter>{messageReactions?.count}</EmojisCounter>
                    )}
                </MessageReactions>
            )}
        </Message>
    );
};

export default ChatMessage;
