import { store } from '../store';

/**
 * This function returns the URL of the user's profile.
 * If the user is the same as the logged-in user, it returns '/app/profile'.
 * Otherwise, it returns `/app/user/${username}`.
 * @param username
 * @returns
 */
export function profileURL(username: string) {
    return store.getState().auth.user?.Username === username
        ? '/app/profile'
        : `/app/user/${username}`;
}
