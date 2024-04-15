import React from 'react';

import { ReceivedUser } from '../../types/user';
import { profileURL } from '../../utils/profileUrlBuilder';
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
}: Partial<ReceivedUser>) => {
    return (
        <CardContainer to={profileURL(Username!)}>
            <UserImage src={ProfileImage} alt="user profile image" />
            <UserFullName>{FullName}</UserFullName>
            <UserUsername>@{Username}</UserUsername>
            <FollowButton
                select="secondary"
                onClickCapture={(e: React.MouseEvent) => {
                    e.nativeEvent.preventDefault();
                }}
            >
                Follow
            </FollowButton>
        </CardContainer>
    );
};

export default UserCard;
