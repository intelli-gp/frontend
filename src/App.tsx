import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import AIHelperPage from './pages/AI-helper/AI-helper.page';
import ForgetPasswordPage from './pages/auth/ForgetPassword';
import LoginPage from './pages/auth/Login';
import RecoverPassword from './pages/auth/RecoverPassword';
import SignupPage from './pages/auth/Signup';
import InterestsPage from './pages/auth/interests/interests.page';
import { ChatroomPage } from './pages/chat-room/chat-room.page';
import CreateArticlePage from './pages/create-article/create-article.page';
import ExploreArticlesPage from './pages/explore-articles/explore-articles.page';
import ExploreGroupsPage from './pages/explore-groups/explore-groups.page';
import HomePage from './pages/home';
import PomodoroPage from './pages/pomodoro/pomodoro.page';
import ProfilePage from './pages/profile/profile.page';
import { SettingsPage } from './pages/settings/settings.page';
import StudyPlanner from './pages/study-planner/study-planner.page';
import AuthTemplatePage from './pages/templates/Auth';
import LoggedInTemplatePage from './pages/templates/LoggedIn';
import UpgradePage from './pages/upgrade/upgrade.page';
import ViewArticlePage from './pages/view-article/view-article.page';
import ViewGroupPage from './pages/view-group/view-group.page';
import { RootState, setCredentials } from './store';
import { getSocket } from './utils/socket';

function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    useLayoutEffect(() => {
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
                // Initialize Socket connection
                getSocket(savedToken);
            }
        }
    }, []);

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthTemplatePage />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="interests" element={<InterestsPage />} />
                <Route
                    path="forget-password"
                    element={<ForgetPasswordPage />}
                />
                <Route path="reset-password" element={<RecoverPassword />} />
            </Route>

            <Route path="app" element={<LoggedInTemplatePage />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="study-planner" element={<StudyPlanner />} />
                <Route path="groups" element={<ExploreGroupsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="articles" element={<ExploreArticlesPage />} />
                {/* This is temporary route */}
                <Route path="groups/:id" element={<ViewGroupPage />} />
                <Route path="chat-room/:id" element={<ChatroomPage />} />

                <Route
                    path="articles/:articleId"
                    element={<ViewArticlePage />}
                />
                <Route path="articles/create" element={<CreateArticlePage />} />
                <Route
                    path="article/edit/:articleId"
                    element={<CreateArticlePage />}
                />
                <Route path="pomodoro" element={<PomodoroPage />} />
                <Route path="AI-helper" element={<AIHelperPage />} />
                <Route path="upgrade" element={<UpgradePage />} />
            </Route>
        </Routes>
    );
}

export default App;
