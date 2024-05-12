import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    RootState,
    useGetFollowingQuery,
    useToggleFollowUserMutation,
} from '../../store';
import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast, successToast } from '../../utils/toasts';
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
    const navigate = useNavigate();
    const storedUser = useSelector((state: RootState) => state.auth.user);

    const isMe = storedUser.Username === Username;

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
            if (alreadyFollowing) {
                successToast('User unfollowed successfully');
            } else {
                successToast('User followed successfully');
            }
        } catch (error) {
            errorToast('Error following user');
            console.log(error);
        }
    };

    const handleNavigateToProfile = () => {
        navigate('/app/profile');
    };

    const buttonTitle = ((alreadyFollowing: boolean, isMe: boolean) => {
        if (isMe) return 'You cannot follow yourself';
        if (alreadyFollowing) return 'Unfollow user';
        return 'Follow user';
    })(alreadyFollowing, isMe);

    const buttonText = ((alreadyFollowing: boolean, isMe: boolean) => {
        if (isMe) return 'View profile';
        if (alreadyFollowing) return 'Unfollow';
        return 'Follow';
    })(alreadyFollowing, isMe);

    const buttonVariant = ((alreadyFollowing: boolean, isMe: boolean) => {
        if (isMe) return 'primary200';
        if (alreadyFollowing) return 'danger';
        return 'secondary';
    })(alreadyFollowing, isMe);

    const buttonOnClick = isMe
        ? handleNavigateToProfile
        : handleToggleFollowUser;

    return (
        <CardContainer to={profileURL(Username!)}>
            <UserImage src={ProfileImage} alt="user profile image" />
            <UserFullName>{isMe ? 'You' : FullName}</UserFullName>
            <UserUsername>@{Username}</UserUsername>
            <CardMainButton
                loading={toggleFollowUserIsLoading}
                onClick={buttonOnClick}
                title={buttonTitle}
                select={buttonVariant}
                outline={alreadyFollowing}
                onClickCapture={(e: React.MouseEvent) => {
                    e.nativeEvent.preventDefault();
                }}
            >
                {buttonText}
            </CardMainButton>
        </CardContainer>
    );
};

export default UserCard;
