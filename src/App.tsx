import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes';
import AIHelperPage from './pages/AI-helper/AI-helper.page';
import ForgetPasswordPage from './pages/auth/froget-password/forget-password.page';
import RecoverPassword from './pages/auth/froget-password/recover-password.page';
import InterestsPage from './pages/auth/interests/interests.page';
import LoginPage from './pages/auth/login.page';
import SignupPage from './pages/auth/signup.page';
import { ChatroomPage } from './pages/chat-room/chat-room.page';
import CreateArticlePage from './pages/create-article/create-article.page';
import ExploreArticlesPage from './pages/explore-articles/explore-articles.page';
import ExploreGroupsPage from './pages/explore-groups/explore-groups.page';
import HomePage from './pages/home/home.page';
import NotFoundPage from './pages/not-found-page/not-found.page';
import PomodoroPage from './pages/pomodoro/pomodoro.page';
import ProfilePage from './pages/profile/profile.page';
import { SettingsPage } from './pages/settings/settings.page';
import StudyPlanner from './pages/study-planner/study-planner.page';
import AuthTemplatePage from './pages/templates/Auth';
import LoggedInTemplatePage from './pages/templates/LoggedIn';
import UpgradePage from './pages/upgrade/upgrade.page';
import ViewArticlePage from './pages/view-article/view-article.page';
import ViewGroupPage from './pages/view-group/view-group.page';
import { ChatsPage } from './pages/chats/chats.page';

function App() {
    return (
        <AnimatePresence>
            <Routes location={useLocation()}>
                <Route index element={<HomePage />} />
                <Route path="auth" element={<AuthTemplatePage />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="interests" element={<InterestsPage />} />
                    <Route
                        path="forget-password"
                        element={<ForgetPasswordPage />}
                    />
                    <Route
                        path="reset-password"
                        element={<RecoverPassword />}
                    />
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="app" element={<LoggedInTemplatePage />}>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route
                            path="user/:username"
                            element={<ProfilePage />}
                        />
                        <Route
                            path="study-planner"
                            element={<StudyPlanner />}
                        />
                        <Route path="groups" element={<ExploreGroupsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route
                            path="articles"
                            element={<ExploreArticlesPage />}
                        />
                        <Route path="groups/:id" element={<ViewGroupPage />} />
                        <Route
                            path="chat-room/:id"
                            element={<ChatroomPage />}
                        />
                        <Route
                            path="articles/:articleId"
                            element={<ViewArticlePage />}
                        />

                        <Route
                            path="articles/create"
                            element={<CreateArticlePage />}
                        />
                        <Route
                            path="article/edit/:articleId"
                            element={<CreateArticlePage />}
                        />
                        <Route path="pomodoro" element={<PomodoroPage />} />
                        <Route path="AI-helper" element={<AIHelperPage />} />
                        <Route path="upgrade" element={<UpgradePage />} />
                        <Route path="chats" element={<ChatsPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/404" replace />} />
                <Route path="/404" element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    );
}

export default App;
