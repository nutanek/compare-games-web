import { Link } from "react-router-dom";
import styled from "styled-components";
import { Layout, Button, Modal } from "antd";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import { ROOT_PATH } from "./../../../constants/appConstants";
import {
    isLoggedIn as checkLoggedIn,
} from "../../../services/appServices";
import SearchBoxDesktop from "./SearchBox";
import Logo from "./../../../images/logo.png";

const { Header } = Layout;
const { confirm } = Modal;

const Container = styled(Header)`
    position: fixed;
    display: flex;
    align-items: center;
    background-color: var(--main-app-color);
    width: 100%;
    height: 80px;
    z-index: 99;
    .logo {
        display: flex;
        align-items: center;
        padding-right: 15px;
        img {
            height: 40px;
        }
        .title {
            padding-left: 10px;
            color: #ffffff;
        }
    }
    .menu {
        padding: 0 15px;
        color: #ffffff;
    }
    .search-box-container {
        padding: 0 15px;
        flex: 1;
    }
    .account-buttons {
        display: flex;
        gap: 15px;
        button {
            border-radius: 8px;
            border-color: #ffffff;
            padding: 0 25px;
            transition: all 0.4s;
            &.login {
                color: var(--main-app-color);
                background-color: #ffffff;
            }
            &.register {
                color: #ffffff;
                background-color: transparent;
            }
            &.account {
                color: var(--main-app-color);
                background-color: #ffffff;
            }
            &.wishlist {
                padding-left: 0;
                border: none;
                color: #ffffff;
            }
            &:hover {
                opacity: 0.7;
            }
        }
    }
`;

const DesktopHeader = (): JSX.Element => {
    const isLoggedIn = checkLoggedIn();

    return (
        <Container>
            <Link
                to={`${ROOT_PATH}/`}
                className="logo text-md text-bold pointer"
            >
                <img src={Logo} alt="logo" />
                <div className="title">Consoles</div>
            </Link>
            <Link
                to={`${ROOT_PATH}/games`}
                className="menu text-md text-bold pointer"
            >
                All Games
            </Link>
            <div className="search-box-container">
                <SearchBoxDesktop />
            </div>
            <div className="menu account-buttons text-md">
                <Link to={`${ROOT_PATH}/account/wishlist`}>
                    <Button
                        className="wishlist text-md text-bold"
                        type="text"
                        size="large"
                        icon={<HeartFilled style={{ color: "#fe0a06" }} />}
                    >
                        Wish List
                    </Button>
                </Link>
                {isLoggedIn ? (
                    <Link to={`${ROOT_PATH}/account`}>
                        <Button
                            className="account text-md text-bold"
                            type="primary"
                            size="large"
                            icon={<UserOutlined />}
                        >
                            My Account
                        </Button>
                    </Link>
                ) : (
                    <>
                        <Link to={`${ROOT_PATH}/login`}>
                            <Button
                                className="login text-md text-bold"
                                type="primary"
                                size="large"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to={`${ROOT_PATH}/signup`}>
                            <Button
                                className="register text-md text-bold"
                                type="primary"
                                size="large"
                            >
                                Register
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </Container>
    );
};

export default DesktopHeader;
