import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Input, InputRef, List, message } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { io, Socket } from "socket.io-client";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    SocketData,
} from "../../models/sokect";
import { ERRORS } from "../../constants/appConstants";
import { ChatRoom } from "../../models/chat";
import { getChatRoomApi } from "./../../services/apiServices";
import ChatButton from "./ChatButton";
import SingleGroupChat from "./SingleGroupChat";
import InputMessage from "./InputMessage";
import { getLocalUserInfo } from "../../services/appServices";

const GroupChat = () => {
    const [chatMessages, setChatMessages] = useState<SocketData>();
    const [visible, setVisible] = useState(false);
    const [selectedSingleGroupId, setSelectedSingleGroupId] =
        useState<number>(-1);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

    useEffect(() => {
        if (selectedSingleGroupId !== -1) {
            socket = io("ws://localhost:8080");
            socket.on("connect", () => {
                console.log(`Socket.io is connected`);
            });
            socket.on("newMessage", (msg) => {
                console.log("-----------", msg);
            });
        }
    }, [selectedSingleGroupId]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = (): void => {
        setVisible(false);
    };

    useEffect(() => {
        getChatRooms();
    }, []);

    async function getChatRooms(): Promise<void> {
        try {
            let { data } = await getChatRoomApi({
                page: 1,
            });
            setChatRooms(data);
        } catch (error: any) {
            console.log(error?.response?.message || ERRORS.unknown);
        }
    }

    function onOpenSingleGroupChat(id: number): void {
        setSelectedSingleGroupId(id);
    }

    function sendMessage(value: string) {
        const userInfo = getLocalUserInfo()
        socket.emit("sendMessage", {
            userId: userInfo.user_id,
            userName: userInfo.display_name,
            message: value,
        });
    }

    return (
        <div>
            <ChatButton onClick={() => showDrawer()} />

            <Drawer
                title={
                    <div>
                        <p>ddsdsd</p>
                        <Input />
                    </div>
                }
                placement="right"
                closeIcon={null}
                closable={false}
                size="large"
                onClose={() => onClose()}
                visible={visible}
                footer={
                    <div>
                        <InputMessage onSubmit={sendMessage}/>
                    </div>
                }
            >
                {selectedSingleGroupId === -1 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={chatRooms}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="primary"
                                        icon={<WechatOutlined />}
                                        onClick={() =>
                                            onOpenSingleGroupChat(item.id)
                                        }
                                    >
                                        Chat
                                    </Button>,
                                ]}
                            >
                                {item.name}
                            </List.Item>
                        )}
                    />
                ) : (
                    <SingleGroupChat
                        onClose={() => setSelectedSingleGroupId(-1)}
                    />
                )}
            </Drawer>
        </div>
    );
};

export default GroupChat;
