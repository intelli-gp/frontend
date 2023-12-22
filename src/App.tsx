import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ProtectedPage from './components/ProtectedPage';
import ForgetPasswordPage from './pages/auth/ForgetPassword';
import LoginPage from './pages/auth/Login';
import RecoverPassword from './pages/auth/RecoverPassword';
import SignupPage from './pages/auth/Signup';
import HomePage from './pages/home';
import AuthTemplatePage from './pages/templates/Auth';
import LoggedInTemplatePage from './pages/templates/LoggedIn';
import { RootState, setCredentials } from './store';

function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    if (!token) {
        let savedToken = window.localStorage.getItem('token');
        let user = window.localStorage.getItem('user');
        if (savedToken) {
            dispatch(
                setCredentials({
                    token: savedToken,
                    user: JSON.parse(user as string),
                }),
            );
        }
    }

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthTemplatePage />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route
                    path="forget-password"
                    element={<ForgetPasswordPage />}
                />
                <Route path="reset-password" element={<RecoverPassword />} />
            </Route>

            <Route
                path="app"
                element={<ProtectedPage element={<LoggedInTemplatePage />} />}
            />
        </Routes>
    );
}

export default App;
