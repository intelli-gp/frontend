import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ProtectedRouteProps = {
    path: string;
    element: string;
    children: React.ReactNode;
} & Record<string, unknown>;

const ProtectedRoute = ({
    path,
    element,
    children,
    ...other
}: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    return isAuthenticated ? (
        <Route path={path} element={element} {...other}>
            {children}
        </Route>
    ) : (
        <Navigate to="/auth/login" />
    );
};

export default ProtectedRoute;
