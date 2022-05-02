import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ROOT_PATH } from "./constants/appConstants";
import { isLoggedIn as checkIsLoggedIn } from "./services/appServices";
import ScrollToTop from "./components/Utility/ScrollToTop";
import GroupChat from "./components/GroupChat/GroupChat";
import DesktopLayout from "./components/Layout/DesktopLayout";
import NotFoundPage from "./components/Pages/NotFoundPage";
import HomePage from "./components/Pages/HomePage";
import SingleGamePage from "./components/Pages/SingleGamePage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import GamesPage from "./components/Pages/GamesPage";
import AcoountPage from "./components/Pages/AcoountPage";
import AcoountProfilePage from "./components/Pages/AcoountProfilePage";
import AcoountWishListPage from "./components/Pages/AcoountWishListPage";
import AcoountPasswordPage from "./components/Pages/AcoountPasswordPage";

const AppRoutes = () => {
    const isLoggedIn = checkIsLoggedIn();
    let routes = [
        { path: `*`, element: <NotFoundPage /> },
        { path: `${ROOT_PATH}/`, element: <HomePage /> },
        { path: `${ROOT_PATH}/game/:id`, element: <SingleGamePage /> },
        { path: `${ROOT_PATH}/games`, element: <GamesPage /> },
        { path: `${ROOT_PATH}/login`, element: <LoginPage /> },
        { path: `${ROOT_PATH}/signup`, element: <SignupPage /> },
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

    const routers = useRoutes(routes);
    return routers;
};

function App(): JSX.Element {
    return (
        <Router>
            <ScrollToTop>
                <DesktopLayout>
                    <AppRoutes />
                </DesktopLayout>
            </ScrollToTop>
            {/* <GroupChat /> */}
        </Router>
    );
}

export default App;
