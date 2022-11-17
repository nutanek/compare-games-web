import { Link } from "react-router-dom";
import { Button, Modal, Drawer, List } from "antd";
import {
    HomeOutlined,
    BuildOutlined,
    LoginOutlined,
    UserAddOutlined,
    UserOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import { ROOT_PATH } from "./../../../constants/appConstants";
import { T } from "../../../services/translateServices";
import { isLoggedIn as checkLoggedIn } from "../../../services/appServices";

const data = [
    {
        title: T("HOME"),
        titleTh: "หน้าแรก",
        icon: <HomeOutlined />,
        hideOnAuth: false,
        needAuth: false,
        link: `${ROOT_PATH}/`,
    },
    {
        title: T("GAMES"),
        icon: <BuildOutlined />,
        hideOnAuth: false,
        needAuth: false,
        link: `${ROOT_PATH}/games`,
    },
    {
        title: T("WISH_LIST"),
        icon: <HeartOutlined />,
        hideOnAuth: false,
        needAuth: false,
        link: `${ROOT_PATH}/account/wishlist`,
    },
    {
        title: T("LOGIN"),
        icon: <LoginOutlined />,
        hideOnAuth: true,
        needAuth: false,
        link: `${ROOT_PATH}/login`,
    },
    {
        title: T("REGISTER"),
        icon: <UserAddOutlined />,
        hideOnAuth: true,
        needAuth: false,
        link: `${ROOT_PATH}/signup`,
    },
    {
        title: T("MY_ACCOUNT"),
        icon: <UserOutlined />,
        hideOnAuth: false,
        needAuth: true,
        link: `${ROOT_PATH}/account`,
    },
];

const MobileMenuDrawer = (props: Props) => {
    const isLoggedIn = checkLoggedIn();

    return (
        <Drawer
            title="Menu"
            placement="left"
            width={300}
            onClose={() => props.onClose()}
            visible={props.isOpen}
        >
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => {
                    let show = false;
                    if (!item.hideOnAuth && !item.needAuth) {
                        show = true;
                    } else if (
                        item.needAuth &&
                        !item.hideOnAuth &&
                        isLoggedIn
                    ) {
                        show = true;
                    } else if (!isLoggedIn && item.hideOnAuth) {
                        show = true;
                    }
                    if (!show) return null;
                    return (
                        <Link to={item.link}>
                            <List.Item onClick={() => props.onClose()}>
                                <List.Item.Meta
                                    avatar={item.icon}
                                    title={item.title}
                                />
                            </List.Item>
                        </Link>
                    );
                }}
            />
        </Drawer>
    );
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default MobileMenuDrawer;
