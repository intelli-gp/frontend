import classNames from 'classnames';
import { useEffect, useState } from 'react';
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
import Button, { ButtonVariant } from '../button/button.component';

type FollowButtonProps = {
    AnotherUserUserName: string;
    AnotherUserID?: number;
    className?: string;
};

export const FollowButton = ({
    AnotherUserUserName,
    AnotherUserID,
    className,
}: FollowButtonProps) => {
    const [buttonType, setButtonType] = useState<ButtonVariant>('primary700');
    const [buttonText, setButtonText] = useState('Follow');
    const [buttonTitle, setButtonTitle] = useState('Follow user');
    const [buttonOutline, setButtonOutline] = useState(true);

    const navigate = useNavigate();
    const storedUser = useSelector((state: RootState) => state.auth.user);

    const { data: _following } = useGetFollowingQuery(storedUser.ID!);
    const loggedInUserFollowings = _following?.data?.Results as ReceivedUser[];

    const [toggleFollowUser, { isLoading: toggleFollowUserIsLoading }] =
        useToggleFollowUserMutation();

    const isMe = storedUser.Username === AnotherUserUserName;
    const alreadyFollowing = loggedInUserFollowings?.some(
        (user) => user.Username === AnotherUserUserName,
    );

    useEffect(() => {
        if (isMe) {
            setButtonTitle('You cannot follow yourself');
            setButtonText('View profile');
            setButtonType('primary200');
            setButtonOutline(false);
            return;
        }
        if (alreadyFollowing) {
            setButtonTitle('Unfollow user');
            setButtonText('Following');
            setButtonType('primary700');
            setButtonOutline(true);
            return;
        }
        setButtonTitle('Follow user');
        setButtonText('Follow');
        setButtonType('primary700');
        setButtonOutline(false);
    }, [isMe, alreadyFollowing]);

    const handleMouseEnter = () => {
        if (alreadyFollowing) {
            setButtonType('danger');
            setButtonText('Unfollow');
            setButtonTitle('Unfollow user');
            setButtonOutline(true);
        }
    };

    const handleMouseLeave = () => {
        if (alreadyFollowing) {
            setButtonType('primary');
            setButtonText('Following');
            setButtonTitle('Unfollow user');
            setButtonOutline(true);
        }
    };

    const handleToggleFollowUser = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!AnotherUserID) {
            errorToast('Can not follow this user!');
            return;
        }
        try {
            await toggleFollowUser(AnotherUserID).unwrap();
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

    const navigateToProfile = () => {
        navigate(profileURL(storedUser.Username!));
    };

    const clickHandler = isMe ? navigateToProfile : handleToggleFollowUser;

    const classes = classNames(className, '!rounded-xl', {});

    return (
        <Button
            select={buttonType}
            outline={buttonOutline}
            title={buttonTitle}
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={classes}
            loading={toggleFollowUserIsLoading}
            onClick={clickHandler}
        >
            {buttonText}
        </Button>
    );
};
