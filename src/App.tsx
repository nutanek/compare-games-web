import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRoutes,
} from "react-router-dom";
import { ROOT_PATH } from "./constants/appConstants";
import DesktopLayout from "./components/Layout/DesktopLayout";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import GamesPage from "./components/Pages/GamesPage";

const AppRoutes = () => {
    let routes = useRoutes([
        { path: `${ROOT_PATH}/`, element: <HomePage /> },
        { path: `${ROOT_PATH}/login`, element: <LoginPage /> },
        { path: `${ROOT_PATH}/games`, element: <GamesPage /> },
    ]);
    return routes;
};

function App(): JSX.Element {
    return (
        <Router>
            <DesktopLayout>
                <AppRoutes />
            </DesktopLayout>
        </Router>
    );
}

export default App;
