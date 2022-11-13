import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ROOT_PATH, USER_ROLE } from "./constants/appConstants";
import {
    isLoggedIn as checkIsLoggedIn,
    getUserRole,
} from "./services/appServices";
import ScrollToTop from "./components/Utility/ScrollToTop";
import GroupChat from "./components/GroupChat/GroupChat";
import MainLayout from "./components/Layout/MainLayout";
import NotFoundPage from "./components/Pages/NotFoundPage";
import HomePage from "./components/Pages/HomePage";
import SingleGamePage from "./components/Pages/SingleGamePage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";
import GamesPage from "./components/Pages/GamesPage";
import AcoountPage from "./components/Pages/AcoountPage";
import AcoountProfilePage from "./components/Pages/AcoountProfilePage";
import AcoountWishListPage from "./components/Pages/AcoountWishListPage";
import AcoountPasswordPage from "./components/Pages/AcoountPasswordPage";
import AcoountAdminGameDetailPage from "./components/Pages/AcoountAdminGameDetailPage";
import AcoountAdminGameListPage from "./components/Pages/AcoountAdminGameListPage";
import AcoountAdminGameUrlPage from "./components/Pages/AcoountAdminGameUrlPage";

const AppRoutes = () => {
    const isLoggedIn = checkIsLoggedIn();
    const userRole = getUserRole();
    let routes = [
        { path: `*`, element: <NotFoundPage /> },
        { path: `${ROOT_PATH}/`, element: <HomePage /> },
        { path: `${ROOT_PATH}/game/:id`, element: <SingleGamePage /> },
        { path: `${ROOT_PATH}/games`, element: <GamesPage /> },
        { path: `${ROOT_PATH}/login`, element: <LoginPage /> },
        { path: `${ROOT_PATH}/signup`, element: <SignupPage /> },
        { path: `${ROOT_PATH}/forgot-password`, element: <ForgotPasswordPage /> },
        { path: `${ROOT_PATH}/reset-password`, element: <ResetPasswordPage /> },
        {
            path: `${ROOT_PATH}/account/wishlist`,
            element: <AcoountWishListPage />,
        },
    ];

    if (isLoggedIn) {
        routes = [
            ...routes,
            { path: `${ROOT_PATH}/account`, element: <AcoountPage /> },
            {
                path: `${ROOT_PATH}/account/profile`,
                element: <AcoountProfilePage />,
            },
            {
                path: `${ROOT_PATH}/account/password`,
                element: <AcoountPasswordPage />,
            },
        ];
    }

    if (isLoggedIn && userRole === USER_ROLE.admin) {
        routes = [
            ...routes,
            {
                path: `${ROOT_PATH}/account/admin/game/:id`,
                element: <AcoountAdminGameDetailPage type="EDIT" />,
            },
            {
                path: `${ROOT_PATH}/account/admin/game`,
                element: <AcoountAdminGameDetailPage type="ADD" />,
            },
            {
                path: `${ROOT_PATH}/account/admin/games`,
                element: <AcoountAdminGameListPage />,
            },
            {
                path: `${ROOT_PATH}/account/admin/game-url`,
                element: <AcoountAdminGameUrlPage />,
            },
        ];
    }

    const routers = useRoutes(routes);
    return routers;
};

function App(): JSX.Element {
    return (
        <Router>
            <ScrollToTop>
                <MainLayout>
                    <AppRoutes />
                </MainLayout>
            </ScrollToTop>
            <GroupChat />
        </Router>
    );
}

export default App;
