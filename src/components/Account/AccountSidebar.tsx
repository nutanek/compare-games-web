import { Link } from "react-router-dom";
import { Modal } from "antd";
import {
    UserOutlined,
    HeartOutlined,
    BuildOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { getLocalUserInfo, signout } from "./../../services/appServices";
import { T } from "./../../services/translateServices";
import { IMAGE_PATH, ROOT_PATH, USER_ROLE } from "../../constants/appConstants";
import withRouter from "../../hocs/withRouter";

const { confirm } = Modal;

const Container = styled.div`
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar-wrapper {
            width: 80%;
            max-width: 200px;
            > .avatar {
                position: relative;
                overflow: hidden;
                height: 0;
                padding-bottom: 100%;
                border-radius: 100%;
                background-color: #dddddd;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .display-name {
            padding-top: 15px;
        }
        .role-label {
            margin: 5px 0;
            padding: 5px;
            background-color: #ff5a5a;
            color: #ffffff;
            border-radius: 8px;
            line-height: 1;
        }
    }
    .menu-list-wrapper {
        width: 100%;
        text-align: center;
        margin-top: 15px;
        .menu-list {
            display: inline-block;
            padding: 20px 0;
            .menu-item {
                padding: 10px 0;
                display: flex;
                gap: 10px;
                align-items: center;
                color: var(--main-app-color);
                &.active {
                    color: #0f79af;
                }
            }
        }
    }
`;

const PATH_ACTIVE = {
    userInfo: ["/account", "/account/profile", "/account/password"].map(
        (path) => ROOT_PATH + path
    ),
    wishlist: ["/account/wishlist"].map((path) => ROOT_PATH + path),
    games: ["/account/admin/games"].map((path) => ROOT_PATH + path),
};

const AccountSidebar = (props: Props) => {
    const user = getLocalUserInfo();

    function showConfirmLogoutModal() {
        confirm({
            title: T("CONFIRM_LOGOUT"),
            centered: true,
            maskClosable: true,
            okText: T("OK"),
            cancelText: T("CANCEL"),
            onOk() {
                signout({ isCallback: true });
            },
            onCancel() {},
        });
    }

    return (
        <Container className="text-sm">
            <div className="profile">
                <div className="avatar-wrapper">
                    <div className="avatar">
                        <img
                            src={
                                user.image
                                    ? `${IMAGE_PATH}/users/${user.image}`
                                    : `${ROOT_PATH}/images/no-avatar.png`
                            }
                            alt="user"
                        />
                    </div>
                </div>
                <div className="display-name text-lg text-bold">
                    {user.display_name}
                </div>
                {user.role === "admin" && <div className="role-label text-xs text-bold">Admin</div>}
            </div>

            <div className="menu-list-wrapper">
                <div className="menu-list text-md ">
                    <Link to={`${ROOT_PATH}/account`}>
                        <div
                            className={`menu-item pointer ${
                                PATH_ACTIVE.userInfo.includes(
                                    props.location?.pathname as string
                                )
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <div className="icon">
                                <UserOutlined />
                            </div>
                            <div className="text">{T("USER_INFO")}</div>
                        </div>
                    </Link>

                    <Link to={`${ROOT_PATH}/account/wishlist`}>
                        <div
                            className={`menu-item pointer ${
                                PATH_ACTIVE.wishlist.includes(
                                    props.location?.pathname as string
                                )
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <div className="icon">
                                <HeartOutlined />
                            </div>
                            <div className="text">{T("WISH_LIST")}</div>
                        </div>
                    </Link>

                    {user.role === USER_ROLE.admin && (
                        <Link to={`${ROOT_PATH}/account/admin/games`}>
                            <div
                                className={`menu-item pointer ${
                                    PATH_ACTIVE.games.includes(
                                        props.location?.pathname as string
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <div className="icon">
                                    <BuildOutlined />
                                </div>
                                <div className="text">{T("GAMES")}</div>
                            </div>
                        </Link>
                    )}

                    <div
                        className="menu-item pointer"
                        onClick={() => showConfirmLogoutModal()}
                    >
                        <div className="icon">
                            <LogoutOutlined />
                        </div>
                        <div className="text">{T("LOGOUT")}</div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

type Props = {
    location?: Location;
};

export default withRouter(AccountSidebar);
