import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    RootState,
    setCredentials,
    useUpdateNotificationsSettingsMutation,
} from '../store';
import { UserNotificationSettings, UserToSend } from '../types/user';
import { errorToast, infoToast, successToast } from '../utils/toasts';

type useNotificationsHookType = {
    messageIsOn: boolean;
    followIsOn: boolean;
    commentsIsOn: boolean;
};

export const useNotificationsHook = ({}: Partial<useNotificationsHookType>) => {
    const dispatch = useDispatch();

    const { user, token } = useSelector((state: RootState) => state.auth);

    const [messagesIsOn, setMessagesIsOn] = useState(true);
    const [followIsOn, setFollowIsOn] = useState(
        !!user.IsFollowNotificationsMuted,
    );
    const [articlesIsOn, setArticlesIsOn] = useState(
        !!user.IsArticleNotificationsMuted,
    );
    const [allOn, setAllOn] = useState(!!user.IsAllNotificationsMuted);

    const [triggerUpdateNotifications, { isLoading }] =
        useUpdateNotificationsSettingsMutation();

    const getUpdateDiff = () => {
        const diff: Partial<UserNotificationSettings> = {
            IsAllNotificationsMuted: false,
        };

        if (user.IsGroupNotificationsMuted !== !messagesIsOn) {
            diff.IsGroupNotificationsMuted = !messagesIsOn;
        }
        if (user.IsFollowNotificationsMuted !== !followIsOn) {
            diff.IsFollowNotificationsMuted = !followIsOn;
        }
        if (user.IsArticleNotificationsMuted !== !articlesIsOn) {
            diff.IsArticleNotificationsMuted = !articlesIsOn;
        }

        return diff;
    };

    const updateNotificationsSettings = async () => {
        const diff = getUpdateDiff();
        if (Object.keys(diff).length === 0) {
            infoToast('No changes detected');
            return;
        }

        try {
            const {
                data: { updatedUser },
            } = await triggerUpdateNotifications(diff).unwrap();
            dispatch(
                setCredentials({
                    user: updatedUser,
                    token,
                }),
            );
            successToast('Notifications settings updated successfully');
        } catch {
            errorToast('Failed to update notifications settings');
        }
    };

    useEffect(() => {
        setAllOn(
            !Boolean(user.IsGroupNotificationsMuted) &&
                !Boolean(user.IsFollowNotificationsMuted) &&
                !Boolean(user.IsArticleNotificationsMuted),
        );
        setMessagesIsOn(!Boolean(user.IsGroupNotificationsMuted));
        setFollowIsOn(!Boolean(user.IsFollowNotificationsMuted));
        setArticlesIsOn(!Boolean(user.IsArticleNotificationsMuted));
    }, [user]);

    useEffect(() => {
        if (messagesIsOn && followIsOn && articlesIsOn) {
            setAllOn(true);
        } else {
            setAllOn(false);
        }
    }, [messagesIsOn, followIsOn, articlesIsOn]);

    const toggleMessages = () => {
        setMessagesIsOn((prev) => {
            return !prev;
        });
    };

    const toggleFollow = () => {
        setFollowIsOn((prev) => {
            return !prev;
        });
    };

    const toggleComments = () => {
        setArticlesIsOn((prev) => {
            return !prev;
        });
    };

    const toggleAllOn = () => {
        setAllOn((prev) => {
            if (!prev) {
                setMessagesIsOn(true);
                setFollowIsOn(true);
                setArticlesIsOn(true);
            } else {
                setMessagesIsOn(false);
                setFollowIsOn(false);
                setArticlesIsOn(false);
            }
            return !prev;
        });
    };

    return {
        messagesIsOn,
        followIsOn,
        commentsIsOn: articlesIsOn,
        allOn,
        toggleMessages,
        toggleFollow,
        toggleComments,
        toggleAllOn,
        updateNotificationsSettings,
        isUpdateNotificationsLoading: isLoading,
    };
};

export const usePersonalInfoHook = () => {
    const storedUser = useSelector((state: RootState) => state.auth.user);

    const [firstName, setFirstName] = useState(
        storedUser.FullName?.split(' ')[0] ?? '',
    );
    const [lastName, setLastName] = useState(
        storedUser.FullName?.substring(firstName.length + 1) ?? '',
    );
    const [username, setUsername] = useState(storedUser.Username ?? '');
    const [email, setEmail] = useState(storedUser.Email ?? '');
    const [headline, setHeadline] = useState(storedUser.Headline ?? '');
    const [phone, setPhone] = useState(storedUser.PhoneNumber);
    const [birthDate, setBirthDate] = useState(
        new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
    );
    const [bio, setBio] = useState(storedUser.Bio);
    const [interests, setInterests] = useState(storedUser.UserTags);

    useEffect(() => {
        setFirstName(storedUser?.FullName!?.split(' ')[0]);
        setLastName(storedUser?.FullName!?.substring(firstName.length + 1));
        setUsername(storedUser?.Username!);
        setEmail(storedUser?.Email!);
        setPhone(storedUser.PhoneNumber);
        setBirthDate(
            new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
        );
        setBio(storedUser.Bio);
        setInterests(storedUser.UserTags);
    }, [storedUser]);

    const getUpdateDiff = () => {
        const diff: Partial<UserToSend> = {};

        if (storedUser.FullName !== `${firstName} ${lastName}`) {
            diff.fullName = `${firstName} ${lastName}`;
        }
        if (storedUser.Username !== username) {
            diff.username = username;
        }
        if (storedUser.Email !== email) {
            diff.email = email;
        }
        if (storedUser.PhoneNumber !== phone) {
            diff.phoneNumber = phone;
        }
        if (storedUser.Headline !== headline) {
            diff.headline = headline;
        }
        if (
            new Date(storedUser?.DOB ?? Date.now())?.getTime() !==
            new Date(birthDate).getTime()
        ) {
            diff.dob = birthDate;
        }
        if (storedUser.Bio !== bio) {
            diff.bio = bio;
        }
        if (JSON.stringify(storedUser.UserTags) !== JSON.stringify(interests)) {
            diff.addedInterests = _.difference(interests, storedUser.UserTags!);
            diff.removedInterests = _.difference(
                storedUser.UserTags,
                interests!,
            );
        }

        return diff;
    };

    return {
        firstName,
        lastName,
        username,
        email,
        headline,
        phone,
        birthDate,
        bio,
        interests,
        setFirstName,
        setLastName,
        setUsername,
        setEmail,
        setHeadline,
        setPhone,
        setBirthDate,
        setBio,
        setInterests,
        getUpdateDiff,
    };
};
