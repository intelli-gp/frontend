import { capitalize } from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';

import defaultProfileImage from '../../assets/imgs/user.jpg';
import { RootState } from '../../store';
import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import { ButtonProps } from '../button/button.component';
import {
    ActionButton,
    Emoji,
    TimeInfo,
    UserFullName,
    UserItemContainer,
    UserItemImage,
    UserUserName,
} from './user-item.styles';

type UserItemProps = {
    /**
     * Action to be performed by a button added
     * to the component (e.g. follow, un-follow)
     */
    action?: string;
    /**
     * Handler for the action button
     */
    actionHandler?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * Props to be passed to the action button
     */
    actionButtonProps?: Partial<ButtonProps>;
    /**
     * Time section instead of the action button
     * pass the actual time string to be showed
     */
    timeInfo?: string;
    /**
     * Emoji to be displayed `instead of action button`
     */
    emoji?: string | JSX.Element;
} & Partial<ReceivedUser>;

const UserItem = ({
    FullName,
    Username,
    ProfileImage,
    timeInfo,
    action,
    emoji,
    actionHandler,
    actionButtonProps,
}: UserItemProps) => {
    const storedUser = useSelector((state: RootState) => state.auth.user);
    const isMe = Username === storedUser.Username;

    return (
        <UserItemContainer>
            <UserItemImage
                src={ProfileImage ?? defaultProfileImage}
                alt="user profile image"
            />
            <div className="overflow-hidden">
                {FullName && (
                    <UserFullName to={profileURL(Username!)} title={FullName}>
                        {isMe ? 'You' : FullName}
                    </UserFullName>
                )}
                {Username && (
                    <UserUserName title={Username}>@{Username}</UserUserName>
                )}
            </div>
            {action && (
                <ActionButton onClick={actionHandler} {...actionButtonProps}>
                    {capitalize(action)}
                </ActionButton>
            )}
            {emoji && <Emoji>{emoji}</Emoji>}
            {timeInfo && <TimeInfo>{moment(timeInfo).fromNow()}</TimeInfo>}
        </UserItemContainer>
    );
};

export default UserItem;
