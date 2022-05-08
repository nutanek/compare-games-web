import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Layout, Button, Modal } from "antd";
import {
    MenuOutlined,
    SearchOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import { ROOT_PATH } from "./../../../constants/appConstants";
import { isLoggedIn as checkLoggedIn } from "../../../services/appServices";
import MobileMenuDrawer from "./MobileMenuDrawer";
import MobileSearchDrawer from "./MobileSearchDrawer";
// import SearchBoxDesktop from "./SearchBox";

const { Header } = Layout;
const { confirm } = Modal;

const Container = styled(Header)`
    position: fixed;
    display: flex;
    align-items: center;
    background-color: var(--main-app-color);
    width: 100%;
    height: 50px;
    z-index: 99;
    padding: 0 5px;
    .menu-icon {
        font-size: 18px;
        color: #ffffff;
        padding: 0 8px;
    }
    .logo-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            img {
                height: 25px;
            }
            .title {
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
`;

const MobileHeader = (): JSX.Element => {
    const dispatch = useDispatch();
    let [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    let [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

    return (
        <Container className="header-mobile">
            <div className="menu-icon" onClick={() => setIsOpenMenu(true)}>
                <MenuOutlined />
            </div>
            <div className="logo-wrapper">
                <Link to={`${ROOT_PATH}/`} className="logo">
                    <img src={`${ROOT_PATH}/images/logo.png`} alt="logo" />
                    <div className="title">Consoles</div>
                </Link>
            </div>
            <div className="menu-icon" onClick={() => setIsOpenSearch(true)}>
                <SearchOutlined />
            </div>
            <div
                className="menu-icon"
                onClick={() => dispatch({ type: "OPEN_CHAT_MODAL" })}
            >
                <MessageOutlined />
            </div>
            <MobileMenuDrawer
                isOpen={isOpenMenu}
                onClose={() => setIsOpenMenu(false)}
            />
            <MobileSearchDrawer
                isOpen={isOpenSearch}
                onClose={() => setIsOpenSearch(false)}
            />
        </Container>
    );
};

export default MobileHeader;
