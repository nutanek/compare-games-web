import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRoutes,
} from "react-router-dom";
import { ROOT_PATH } from "./constants/appConstants";
import ScrollToTop from "./components/Utility/ScrollToTop";
import DesktopLayout from "./components/Layout/DesktopLayout";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import GamesPage from "./components/Pages/GamesPage";

const AppRoutes = () => {
    let routes = useRoutes([
        { path: `${ROOT_PATH}/`, element: <HomePage /> },
        { path: `${ROOT_PATH}/login`, element: <LoginPage /> },
        { path: `${ROOT_PATH}/signup`, element: <SignupPage /> },
        { path: `${ROOT_PATH}/games`, element: <GamesPage /> },
    ]);
    return routes;
};

function App(): JSX.Element {
    return (
        <Router>
            <ScrollToTop>
                <DesktopLayout>
                    <AppRoutes />
                </DesktopLayout>
            </ScrollToTop>
        </Router>
    );
}

export default App;
