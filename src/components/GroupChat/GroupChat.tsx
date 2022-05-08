import { useCallback, useEffect, useRef, useState } from "react";
import {
    Avatar,
    Button,
    Drawer,
    Input,
    InputRef,
    List,
    message,
    Pagination,
    Spin,
} from "antd";
import { WechatOutlined, LeftOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    SocketData,
} from "../../models/sokect";
import { ERRORS, IMAGE_PATH, ROOT_PATH, SOCKET_URL } from "../../constants/appConstants";
import { AllChatRooms, ChatRoom } from "../../models/chat";
import {  getChatRoomApi } from "./../../services/apiServices";
import ChatButton from "./ChatButton";
import SingleGroupChat from "./SingleGroupChat";
import InputMessage from "./InputMessage";
import {
    getLocalAccessToken,
    getLocalUserInfo,
    signout,
} from "../../services/appServices";

const initialChatRooms = {
    rooms: [],
    page: 1,
    total: 0,
};

const initialChatRoom = {
    id: -1,
    name: "",
    image: "",
    game_id: 0,
};

const Container = styled.div``;

const GroupChat = () => {
    const [chatItems, setChatItems] = useState<SocketData[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSingleGroupId, setSelectedSingleGroupId] =
        useState<number>(-1);
    const [selectedSingleGroup, setSelectedSingleGroup] =
        useState<ChatRoom>(initialChatRoom);
    const [chatRooms, setChatRooms] = useState<AllChatRooms>(initialChatRooms);
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const socketRef =
        useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedSingleGroupId !== -1) {
            const accessToken = getLocalAccessToken();
            const userInfo = getLocalUserInfo();
            socketRef.current = io(SOCKET_URL || "", {
                reconnectionDelayMax: 10000,
                auth: {
                    token: accessToken,
                },
                query: {
                    room_id: selectedSingleGroupId,
                    display_name: userInfo.display_name,
                },
            });

            socketRef.current.on("connect", () => {
                console.log(`Socket.io is connected`);
            });

            socketRef.current.on("connect_error", (err) => {
                console.log(`Socket.io is connected failed`);
                message.error(err?.message || "Connection failed");
                setSelectedSingleGroupId(-1);
                signout({ isCallback: true });
            });

            socketRef.current.on("newMessage", (receivedChatItem) => {
                if (receivedChatItem.userId === 0) {
                    let audio = new Audio(`${ROOT_PATH}/audios/chat-noti.mp3`);
                    audio.play();
                }

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
            getChatRooms(page || 1, keyword || "");
        }
    }, [isOpen]);

    async function getChatRooms(page: number, keyword: string): Promise<void> {
        try {
            setIsLoading(true);
            let { data } = await getChatRoomApi({
                page,
                keyword,
            });
            setChatRooms(data);
        } catch (error: any) {
            console.log(error?.response?.message || ERRORS.unknown);
        } finally {
            setIsLoading(false);
        }
    }

    function onOpenSingleGroupChat(index: number): void {
        setSelectedSingleGroupId(chatRooms.rooms[index].id);
        setSelectedSingleGroup(chatRooms.rooms[index]);
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

    function onChangeKeyword(value: string): void {
        setKeyword(value);
        setPage(1);
        debouncedChangeKeyword(1, value);
    }

    function onChangePage(page: number): void {
        setPage(page);
        getChatRooms(page, keyword);
    }

    const debouncedChangeKeyword = useCallback(debounce(getChatRooms, 300), []);

    return (
        <Container>
            <ChatButton onClick={() => showDrawer()} />

            <Drawer
                title={
                    selectedSingleGroupId === -1 ? (
                        <div>
                            <div
                                className="chat-header"
                                style={{ paddingBottom: 15 }}
                            >
                                <div className="name text-xl text-bold">
                                    All chat rooms
                                </div>
                                <div className="close">
                                    <Button
                                        danger
                                        type="primary"
                                        size="small"
                                        shape="circle"
                                        icon={<CloseOutlined />}
                                        onClick={() => setIsOpen(false)}
                                    ></Button>
                                </div>
                            </div>

                            <Input
                                allowClear
                                placeholder="Search game..."
                                value={keyword}
                                onChange={(e) =>
                                    onChangeKeyword(e.target.value)
                                }
                            />
                        </div>
                    ) : (
                        <div className="chat-header">
                            <div
                                className="back-icon pointer"
                                onClick={() => onBackToMain()}
                            >
                                <LeftOutlined />
                            </div>
                            <div className="name text-xl text-bold">
                                {selectedSingleGroup.name || ""}
                            </div>
                            <div className="close">
                                <Button
                                    danger
                                    type="primary"
                                    size="small"
                                    shape="circle"
                                    icon={<CloseOutlined />}
                                    onClick={() => setIsOpen(false)}
                                ></Button>
                            </div>
                        </div>
                    )
                }
                className="chat-drawer"
                placement="right"
                closeIcon={null}
                closable={false}
                size="large"
                bodyStyle={selectedSingleGroupId !== -1 ? { padding: 15 } : {}}
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
                    <Spin spinning={isLoading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={chatRooms.rooms}
                            renderItem={(item, index) => (
                                <List.Item
                                    className="pointer"
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<WechatOutlined />}
                                        >
                                            Join
                                        </Button>,
                                    ]}
                                    onClick={() => onOpenSingleGroupChat(index)}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={`${IMAGE_PATH}/games/${item.image}`} />}
                                        title={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ padding: "15px 0", textAlign: "center" }}>
                            <Pagination
                                current={page}
                                pageSize={20}
                                total={chatRooms.total}
                                showSizeChanger={false}
                                hideOnSinglePage
                                onChange={onChangePage}
                            />
                        </div>
                    </Spin>
                ) : (
                    <>
                        <SingleGroupChat
                            ref={messagesEndRef}
                            room={chatRooms.rooms[selectedSingleGroupId]}
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
