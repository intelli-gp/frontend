import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../store';

type ProtectedPageProps = {
    element: JSX.Element;
};

const ProtectedPage = ({ element }: ProtectedPageProps) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    return isAuthenticated ? element : <Navigate to={'/auth/login'} />;
};

export default ProtectedPage;
