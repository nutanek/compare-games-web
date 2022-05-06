import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Input, InputRef, List, message } from "antd";
import { WechatOutlined, LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
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
import {
    getLocalAccessToken,
    getLocalUserInfo,
} from "../../services/appServices";

const Container = styled.div``;

const GroupChat = () => {
    const [chatItems, setChatItems] = useState<SocketData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSingleGroupId, setSelectedSingleGroupId] =
        useState<number>(-1);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const socketRef =
        useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedSingleGroupId !== -1) {
            const accessToken = getLocalAccessToken();
            socketRef.current = io("ws://localhost:8080", {
                reconnectionDelayMax: 10000,
                auth: {
                    token: accessToken,
                },
                query: {
                    room_id: selectedSingleGroupId,
                },
            });

            socketRef.current.on("connect", () => {
                console.log(`Socket.io is connected`);
            });

            socketRef.current.on("newMessage", (receivedChatItem) => {
                setChatItems((prevState) => [...prevState, receivedChatItem]);
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            });

            socketRef.current.on("disconnect", () => {
                console.log(`Socket.io is disconnect`);
            });

            return () => {
                socketRef?.current?.disconnect();
            };
        }
    }, [selectedSingleGroupId]);

    const showDrawer = () => {
        setIsOpen(true);
    };

    const onClose = (): void => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            getChatRooms();
        }
    }, [isOpen]);

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

    function onBackToMain(): void {
        socketRef?.current?.disconnect();
        setSelectedSingleGroupId(-1);
        setChatItems([]);
    }

    function sendMessage(value: string) {
        const userInfo = getLocalUserInfo();
        socketRef?.current?.emit("sendMessage", {
            id: uuidv4(),
            userId: userInfo.user_id,
            displayName: userInfo.display_name,
            image: userInfo.image,
            message: value,
        });
    }

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Container>
            <ChatButton onClick={() => showDrawer()} />

            <Drawer
                title={
                    selectedSingleGroupId === -1 ? (
                        <div>
                            <p>ddsdsd</p>
                            <Input />
                        </div>
                    ) : (
                        <div>
                            <LeftOutlined onClick={() => onBackToMain()} />
                            <p>ddsdsd</p>
                        </div>
                    )
                }
                className="chat-drawer"
                placement="right"
                closeIcon={null}
                closable={false}
                size="large"
                onClose={() => onClose()}
                visible={isOpen}
                footer={
                    selectedSingleGroupId === -1 ? null : (
                        <div>
                            <InputMessage onSubmit={sendMessage} />
                        </div>
                    )
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
                    <>
                        <SingleGroupChat
                            ref={messagesEndRef}
                            chatItems={chatItems}
                            onClose={() => setSelectedSingleGroupId(-1)}
                        />
                    </>
                )}
            </Drawer>
        </Container>
    );
};

export default GroupChat;
