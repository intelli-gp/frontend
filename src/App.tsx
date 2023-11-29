import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import './App.css';
import AuthTemplatePage from './pages/Auth';

function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthTemplatePage />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>
        </Routes>
    );
}

export default App;
