import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { UserToSend } from '../types/user';

type useNotificationsHookType = {
    messageIsOn: boolean;
    followIsOn: boolean;
    commentsIsOn: boolean;
};

const MAX_ON_BUTTONS = 3;

export const useNotificationsHook = ({}: Partial<useNotificationsHookType>) => {
    const [messagesIsOn, setMessagesIsOn] = useState(true);
    const [followIsOn, setFollowIsOn] = useState(true);
    const [commentsIsOn, setCommentsIsOn] = useState(true);
    const [allOn, setAllOn] = useState(true);
    /**
     * This is a counter to set allOn on when it
     * reaches the maximum number of on buttons which currently is MAX_ON_BUTTONS.
     * This logic may not work in dev environment because of React.Strict mode
     * don't modify it unless you know what you are doing.
     */
    const [_counter, _setCounter] = useState(
        +messagesIsOn + +followIsOn + +commentsIsOn, // This is a trick to convert boolean to number to count number of on buttons
    );

    const toggleMessages = () => {
        setMessagesIsOn((prev) => {
            if (prev) {
                /**
                 * If we go from on to off, so the allOn button
                 * should be off to adapt this change
                 */
                setAllOn(false);
                _setCounter((prev) => prev - 1);
            } else {
                _setCounter((prev) => {
                    if (prev + 1 === MAX_ON_BUTTONS) {
                        setAllOn(true);
                    }
                    return prev + 1;
                });
            }
            return !prev;
        });
    };

    const toggleFollow = () => {
        setFollowIsOn((prev) => {
            if (prev) {
                /**
                 * If we go from on to off, so the allOn button
                 * should be off to adapt this change
                 */
                setAllOn(false);
                _setCounter((prev) => prev - 1);
            } else {
                _setCounter((prev) => {
                    if (prev + 1 === MAX_ON_BUTTONS) {
                        setAllOn(true);
                    }
                    return prev + 1;
                });
            }
            return !prev;
        });
    };

    const toggleComments = () => {
        setCommentsIsOn((prev) => {
            if (prev) {
                /**
                 * If we go from on to off, so the allOn button
                 * should be off to adapt this change
                 */
                setAllOn(false);
                _setCounter((prev) => prev - 1);
            } else {
                _setCounter((prev) => {
                    if (prev + 1 === MAX_ON_BUTTONS) {
                        setAllOn(true);
                    }
                    return prev + 1;
                });
            }
            return !prev;
        });
    };

    const toggleAllOn = () => {
        setAllOn((prev) => {
            if (!prev) {
                setMessagesIsOn(true);
                setFollowIsOn(true);
                setCommentsIsOn(true);
            } else {
                setMessagesIsOn(false);
                setFollowIsOn(false);
                setCommentsIsOn(false);
            }
            return !prev;
        });
    };

    return {
        messagesIsOn,
        followIsOn,
        commentsIsOn,
        allOn,
        toggleMessages,
        toggleFollow,
        toggleComments,
        toggleAllOn,
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
