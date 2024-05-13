import { NavigateFunction } from 'react-router-dom';

/**
 * Helper to give access to navigation from anywhere in the app
 */
type RoutingHelper = {
    navigate: NavigateFunction;
};

export const routingHelper: RoutingHelper = {
    navigate: null!,
};
