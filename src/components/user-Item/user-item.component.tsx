import { capitalize } from 'lodash';
import moment from 'moment';

import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import {
    ActionButton,
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
} & Partial<ReceivedUser>;

const UserItem = ({
    FullName,
    Username,
    ProfileImage,
    timeInfo,
    action,
    actionHandler,
}: UserItemProps) => {
    return (
        <UserItemContainer>
            <UserItemImage src={ProfileImage!} alt="user profile image" />
            <div className="overflow-hidden">
                <UserFullName to={profileURL(Username!)} title={FullName}>
                    {FullName}
                </UserFullName>
                <UserUserName>@{Username}</UserUserName>
            </div>
            {action && (
                <ActionButton onClick={actionHandler}>
                    {capitalize(action)}
                </ActionButton>
            )}
            {timeInfo && <TimeInfo>{moment(timeInfo).fromNow()}</TimeInfo>}
        </UserItemContainer>
    );
};

export default UserItem;
