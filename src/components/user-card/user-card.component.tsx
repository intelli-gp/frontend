import React from 'react';
import { useSelector } from 'react-redux';

import {
    RootState,
    useGetFollowingQuery,
    useToggleFollowUserMutation,
} from '../../store';
import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast } from '../../utils/toasts';
import {
    CardContainer,
    FollowButton,
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

    const [toggleFollowUser, { isLoading: toggleFollowUserIsLoading }] =
        useToggleFollowUserMutation();
    const { data: _following } = useGetFollowingQuery(storedUser.ID!);
    const loggedInUserFollowings = _following?.data?.Results as ReceivedUser[];

    const alreadyFollowing = loggedInUserFollowings?.some(
        (user) => user.Username === Username,
    );

    const handleToggleFollowUser = async () => {
        try {
            await toggleFollowUser(ID!).unwrap();
        } catch (error) {
            errorToast('Error following user');
            console.log(error);
        }
    };

    return (
        <CardContainer to={profileURL(Username!)}>
            <UserImage src={ProfileImage} alt="user profile image" />
            <UserFullName>{FullName}</UserFullName>
            <UserUsername>@{Username}</UserUsername>
            <FollowButton
                loading={toggleFollowUserIsLoading}
                onClick={handleToggleFollowUser}
                title={
                    alreadyFollowing ? 'Unfollow this user' : 'Follow this user'
                }
                select={alreadyFollowing ? 'danger' : 'secondary'}
                outline={alreadyFollowing}
                onClickCapture={(e: React.MouseEvent) => {
                    e.nativeEvent.preventDefault();
                }}
            >
                {alreadyFollowing ? 'Unfollow' : 'Follow'}
            </FollowButton>
        </CardContainer>
    );
};

export default UserCard;
