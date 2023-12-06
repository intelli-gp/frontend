import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setToken } from './store';

import SignupPage from './pages/auth/Signup';
import LoginPage from './pages/auth/Login';
import HomePage from './pages/Home';
import AuthTemplatePage from './pages/templates/Auth';
import ForgetPasswordPage from './pages/auth/ForgetPassword';
import ProtectedPage from './components/ProtectedPage';
import LoggedInTemplatePage from './pages/templates/LoggedIn';

import './App.css';

function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => {
        return state.auth;
    });

    if (!token) {
        let savedToken = window.localStorage.getItem('token');
        if (savedToken) {
            dispatch(setToken(savedToken));
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
            </Route>
            <Route path='logged-in' element={<LoggedInTemplatePage />}/>
            <Route
                path="secret"
                element={<ProtectedPage element={<LoginPage />} />}
            />
        </Routes>
    );
}

export default App;
