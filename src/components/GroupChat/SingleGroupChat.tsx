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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    .chat-messages {
        flex: 1;
        background-color: #ff0000;
    }
`;

const SingleGroupChat = (props: Props) => {
    let body = document.body,
        html = document.documentElement;

    let containerHeight =
        Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        ) - 300;

    const [data, setData] = useState([]);

  

    // async function getChatRooms() {
    //     try {
    //         let { data } = await getChatRoomApi({
    //             page: 1,
    //         });
    //         setChatRooms(data);
    //     } catch (error: any) {
    //         console.log(error?.response?.message || ERRORS.unknown);
    //     }
    // }

    const onScroll = (e: any) => {
        if (e.target.scrollHeight - e.target.scrollTop === containerHeight) {
            //   appendData();
        }
    };

    return (
        <Container>
            <div className="chat-messages">
                <List>
                    <VirtualList
                        data={data}
                        height={containerHeight}
                        itemHeight={47}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item) => (
                            <List.Item key={1}>
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.picture.large} />}
                                    title={"dssdsd"}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </div>

            <div>
                sdsdsd
                <Input placeholder="Basic usage" />
            </div>
        </Container>
    );
};

type Props = {
    onClose: () => void;
};

export default SingleGroupChat;
