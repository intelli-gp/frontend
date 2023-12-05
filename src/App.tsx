import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setToken } from './store';

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import AuthTemplatePage from './pages/Auth';
import ForgetPasswordPage from './pages/ForgetPassword';
import ProtectedPage from './components/ProtectedPage';

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
            <Route
                path="secret"
                element={<ProtectedPage element={<LoginPage />} />}
            />
        </Routes>
    );
}
  
export default App;
