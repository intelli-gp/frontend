import { capitalize } from 'lodash';
import { Link } from 'react-router-dom';

import { ReceivedUser } from '../../types/user';
import Button from '../button/button.component';
import {
    UserFullName,
    UserItemContainer,
    UserItemImage,
    UserUserName,
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
            <UserItemImage src={image!} alt="user profile" />
            <div>
                <UserFullName title={full_name}>
                    <Link to={'#'} className="text-inherit">
                        {full_name}
                    </Link>
                </UserFullName>
                <UserUserName>@{username}</UserUserName>
            </div>
            {action && (
                <Button
                    select="primary700"
                    type="button"
                    onClick={actionHandler}
                    className="ml-auto text-[0.8rem] !px-2 !py-1"
                >
                    {capitalize(action)}
                </Button>
            )}
        </UserItemContainer>
    );
};

export default UserItem;
