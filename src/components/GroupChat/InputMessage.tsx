import { useState } from "react";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { T } from "./../../services/translateServices";

const Container = styled.div`
    display: flex;
    gap: 10px;
`;

const InputMessage = (props: Props) => {
    let [message, setMessage] = useState<string>("");

    function onChangeMessage(value: string) {
        setMessage(value);
    }

    function onSubmit(e: any) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function sendMessage() {
        if (message !== "") {
            props.onSubmit(message);
            setMessage("");
        }
    }

    return (
        <Container>
            <Input.TextArea
                size="large"
                value={message}
                autoSize={{ minRows: 1, maxRows: 2 }}
                placeholder={`${T("TYPE_MESSAGE")}...`}
                onChange={(e) => onChangeMessage(e.target.value)}
                onKeyDown={onSubmit}
            />
            <Button
                size="large"
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={() => sendMessage()}
            ></Button>
        </Container>
    );
};

type Props = {
    onSubmit: (value: string) => void;
};

export default InputMessage;
