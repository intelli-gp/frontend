import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { resetToken, store } from '..';

/**
 * At any case if the response of the api is 401 unAuthorized 
 * this middleware deletes the user token from state and from 
 * local storage 
 */
export const checkAuthenticated: Middleware =
    (_api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.log(action);
            if (action.payload.status === 401) {
                store.dispatch(resetToken());
            }
        }
        return next(action);
    };
