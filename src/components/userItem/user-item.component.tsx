import { capitalize } from 'lodash';
import { Link } from 'react-router-dom';

import { ReceivedUser } from '../../types/user';
import Button from '../button/button.component';
import {
    UserItemContainer,
    UserItemImage,
    UserItemUsername,
} from './user-item.styles';

type UserItemProps = {
    action: string;
    actionHandler: React.MouseEventHandler<HTMLButtonElement>;
} & Partial<ReceivedUser>;

const UserItem = ({
    FullName: full_name,
    Username: username,
    ProfileImage: image,
    action,
    actionHandler,
}: UserItemProps) => {
    return (
        <UserItemContainer>
            <UserItemImage src={image} alt="user profile" />
            <div>
                <Link to={'#'} className="text-indigo-950">
                    {full_name}
                </Link>
                <UserItemUsername>@{username}</UserItemUsername>
            </div>
            {action && (
                <Button
                    select="primary700"
                    type="button"
                    onClick={actionHandler}
                    className="!text-white !text-sm ml-auto max-w-[35%]"
                >
                    {capitalize(action)}
                </Button>
            )}
        </UserItemContainer>
    );
};

export default UserItem;
