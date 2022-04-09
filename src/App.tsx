import {
    BrowserRouter as Router,
    useRoutes,
} from "react-router-dom";
import { ROOT_PATH } from "./constants/appConstants";
import { isLoggedIn as checkIsLoggedIn } from "./services/appServices";
import ScrollToTop from "./components/Utility/ScrollToTop";
import GroupChat from "./components/GroupChat/GroupChat";
import DesktopLayout from "./components/Layout/DesktopLayout";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import GamesPage from "./components/Pages/GamesPage";
import WishListPage from "./components/Pages/WishListPage";

const AppRoutes = () => {
    const isLoggedIn = checkIsLoggedIn();
    let routes = [
        { path: `*`, element: <HomePage /> },
        { path: `${ROOT_PATH}/`, element: <HomePage /> },
        { path: `${ROOT_PATH}/games`, element: <GamesPage /> },
        { path: `${ROOT_PATH}/login`, element: <LoginPage /> },
        { path: `${ROOT_PATH}/signup`, element: <SignupPage /> },
    ];

    if (isLoggedIn) {
        routes = [
            ...routes,
            { path: `${ROOT_PATH}/wishlist`, element: <WishListPage /> },
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
            <GroupChat />
        </Router>
    );
}

export default App;
