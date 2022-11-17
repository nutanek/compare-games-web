import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ROOT_PATH } from "./../../../constants/appConstants";
import { T } from "../../../services/translateServices";

const MobileSearchDrawer = (props: Props) => {
    let [keyword, setKeyword] = useState<string>("");

    return (
        <Drawer
            title="Search game"
            placement="top"
            height={200}
            onClose={() => props.onClose()}
            visible={props.isOpen}
        >
            <Input
                allowClear
                placeholder={`${T("GAME_NAME")}...`}
                size="large"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Link to={`${ROOT_PATH}/games?keyword=${keyword}`}>
                <Button
                    block
                    type="primary"
                    size="large"
                    icon={<SearchOutlined />}
                    title={T("SEARCH")}
                    style={{ borderRadius: 8, marginTop: 10 }}
                    onClick={() => {
                        setKeyword("");
                        props.onClose();
                    }}
                >
                    Search
                </Button>
            </Link>
        </Drawer>
    );
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default MobileSearchDrawer;
