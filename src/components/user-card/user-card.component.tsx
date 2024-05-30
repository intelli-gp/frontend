import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import {
    CardContainer,
    CardMainButton,
    UserFullName,
    UserImage,
    UserUsername,
} from './user-card.styles';

const UserCard = ({
    FullName,
    Username,
    ProfileImage,
    ID,
}: Partial<ReceivedUser>) => {
    const storedUser = useSelector((state: RootState) => state.auth.user);

    const isMe = storedUser.Username === Username;

    return (
        <CardContainer>
            <UserImage src={ProfileImage} alt="user profile image" />
            <UserFullName to={profileURL(Username!)}>
                {isMe ? 'You' : FullName}
            </UserFullName>
            <UserUsername>@{Username}</UserUsername>
            <CardMainButton
                AnotherUserUserName={Username!}
                AnotherUserID={ID}
            />
        </CardContainer>
    );
};

export default UserCard;
