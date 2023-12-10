import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCredentials } from './store';

import SignupPage from './pages/auth/Signup';
import LoginPage from './pages/auth/Login';
import HomePage from './pages/Home';
import AuthTemplatePage from './pages/templates/Auth';
import ForgetPasswordPage from './pages/auth/ForgetPassword';
import ProtectedPage from './components/ProtectedPage';
import LoggedInTemplatePage from './pages/templates/LoggedIn';
import RecoverPassword from './pages/auth/RecoverPassword';

import './App.css';

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
