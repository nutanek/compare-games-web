import { useEffect, useState } from "react";
import { Button, Drawer, Input, List, Avatar, message } from "antd";
import styled from "styled-components";
import VirtualList from "rc-virtual-list";
import { io } from "socket.io-client";
import { WechatOutlined } from "@ant-design/icons";
import { ERRORS } from "../../constants/appConstants";
import { ChatRoom } from "../../models/chat";
import { getChatRoomApi } from "./../../services/apiServices";
import ChatButton from "./ChatButton";

const Container = styled.div``;

const InputMessage = (props: Props) => {
    let [message, setMessage] = useState<string>("");

    function onChangeMessage(value: string) {
        setMessage(value);
    }

    function onSubmit() {
        props.onSubmit(message);
        setMessage("");
    }

    return (
        <Container>
            <Input
                value={message}
                onChange={(e) => onChangeMessage(e.target.value)}
                onPressEnter={() => onSubmit()}
            />
        </Container>
    );
};

type Props = {
    onSubmit: (value: string) => void;
};

export default InputMessage;
