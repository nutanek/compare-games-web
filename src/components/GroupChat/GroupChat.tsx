import { useState } from "react";
import ChatButton from "./ChatButton";
import { Drawer } from "antd";

const GroupChat = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <ChatButton onClick={() => showDrawer()}/>

            <Drawer
                title="Basic Drawer"
                placement="right"
                size="large"
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
};

export default GroupChat;
