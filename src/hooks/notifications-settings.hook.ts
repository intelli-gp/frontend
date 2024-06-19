import { useState } from 'react';

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
     * don't 
     */
    const [_counter, _setCounter] = useState(
        +messagesIsOn + +followIsOn + +commentsIsOn, // This is a trick to convert boolean to number to count number of on buttons
    );

    console.log(_counter);

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
