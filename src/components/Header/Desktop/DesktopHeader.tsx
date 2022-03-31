import {Link} from 'react-router-dom'
import {ROOT_PATH} from './../../../constants/appConstants'
import styled from "styled-components";
import { Layout, Button } from "antd";
import SearchBoxDesktop from "./SearchBox";
import Logo from "./../../../images/logo.png";

const { Header } = Layout;

const Container = styled(Header)`
    display: flex;
    align-items: center;
    background-color: var(--main-app-color);
    height: 80px;
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
            &:hover {
                opacity: 0.7;
            }
        }
    }
`;

const DesktopHeader = (): JSX.Element => {
    return (
        <Container>
            <Link to={`${ROOT_PATH}/`} className="logo text-md text-bold pointer">
                <img src={Logo} alt="logo" />
                <div className="title">Consoles</div>
            </Link>
            <Link to={`${ROOT_PATH}/games`} className="menu text-md text-bold pointer">All Games</Link>
            <div className="search-box-container">
                <SearchBoxDesktop />
            </div>
            <div className="menu account-buttons text-md">
                <Button
                    className="login text-md text-bold"
                    type="primary"
                    size="large"
                >
                    Login
                </Button>
                <Button
                    className="register text-md text-bold"
                    type="primary"
                    size="large"
                >
                    Register
                </Button>
            </div>
        </Container>
    );
};

export default DesktopHeader;
