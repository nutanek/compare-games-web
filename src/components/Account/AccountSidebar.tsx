import { Link } from "react-router-dom";
import { Button, Modal, Select } from "antd";
import { UserOutlined, HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getLocalUserInfo, signout } from "./../../services/appServices";
import { ROOT_PATH } from "../../constants/appConstants";

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
            padding: 15px 0;
        }
    }
    .menu-list-wrapper {
        width: 100%;
        text-align: center;
        .menu-list {
            display: inline-block;
            padding: 20px 0;
            .menu-item {
                padding: 10px 0;
                display: flex;
                gap: 10px;
                align-items: center;
            }
        }
    }
`;

const AccountSidebar = (props: Props) => {
    const user = getLocalUserInfo();

    function showConfirmLogoutModal() {
        confirm({
            title: "Do you want to log out?",
            centered: true,
            maskClosable: true,
            onOk() {
                signout({ isCallback: false });
            },
            onCancel() {},
        });
    }

    return (
        <Container className="text-sm">
            <div className="profile">
                <div className="avatar-wrapper">
                    <div className="avatar">
                        <img src={user.image} alt="user" />
                    </div>
                </div>
                <div className="display-name text-lg text-bold">
                    {user.display_name}
                </div>
            </div>

            <div className="menu-list-wrapper">
                <div className="menu-list text-md ">
                    <Link to={`${ROOT_PATH}/account`}>
                        <div className="menu-item pointer">
                            <div className="icon">
                                <UserOutlined />
                            </div>
                            <div className="text">User Info</div>
                        </div>
                    </Link>

                    <Link to={`${ROOT_PATH}/account/wishlist`}>
                        <div className="menu-item pointer">
                            <div className="icon">
                                <HeartOutlined />
                            </div>
                            <div className="text">Wish List</div>
                        </div>
                    </Link>

                    <div
                        className="menu-item pointer"
                        onClick={() => showConfirmLogoutModal()}
                    >
                        <div className="icon">
                            <LogoutOutlined />
                        </div>
                        <div className="text">Log out</div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

type Props = {
    // value: number;
};

export default AccountSidebar;
