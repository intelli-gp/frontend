import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '../store';

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    return isAuthenticated ? <Outlet /> : <Navigate to={'/auth/login'} />;
};

export default ProtectedRoutes;
