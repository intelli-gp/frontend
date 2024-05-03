import { capitalize } from 'lodash';
import moment from 'moment';

import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
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
     * Time section instead of the action button
     * pass the actual time string to be showed
     */
    timeInfo?: string;

    /**
     * Emoji to be displayed `instead of action button`
     */
    emoji?: string;
} & Partial<ReceivedUser>;

const UserItem = ({
    FullName,
    Username,
    ProfileImage,
    timeInfo,
    action,
    emoji,
    actionHandler,
}: UserItemProps) => {
    return (
        <UserItemContainer>
            <UserItemImage src={ProfileImage!} alt="user profile image" />
            <div className="overflow-hidden">
                {FullName && (
                    <UserFullName to={profileURL(Username!)} title={FullName}>
                        {FullName}
                    </UserFullName>
                )}
                {Username && (
                    <UserUserName title={Username}>@{Username}</UserUserName>
                )}
            </div>
            {action && (
                <ActionButton onClick={actionHandler}>
                    {capitalize(action)}
                </ActionButton>
            )}
            {emoji && <Emoji>{emoji}</Emoji>}
            {timeInfo && <TimeInfo>{moment(timeInfo).fromNow()}</TimeInfo>}
        </UserItemContainer>
    );
};

export default UserItem;
