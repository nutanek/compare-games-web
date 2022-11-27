import { forwardRef } from "react";
import styled from "styled-components";
import {
    IMAGE_PATH,
    ROOT_PATH,
    STICKER_KEY,
} from "../../constants/appConstants";
import { getLocalUserInfo } from "../../services/appServices";
import { SocketData } from "../../models/sokect";
import { ChatRoom } from "../../models/chat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .chat-messages {
        flex: 1;
        .chat-item {
            display: flex;
            .avatar {
                margin-top: 20px;
                background-color: #dddddd;
                background-size: cover;
                background-position: center center;
                width: 50px;
                height: 50px;
                border-radius: 100%;
            }
            .message-box-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .message-box {
                    width: fit-content;
                    padding: 5px 10px;
                    background: #c4c4c4;
                    border-radius: 8px;
                    white-space: pre-line;
                }
                .image-box {
                    width: 150px;
                    > img {
                        width: 100%;
                    }
                }
                @media (max-width: 767.99px) {
                    .image-box {
                        width: 120px;
                    }
                }
            }
            &.left {
                .message-box-wrapper {
                    padding: 10px 65px 10px 15px;
                }
            }
            &.right {
                .profile {
                    order: 1;
                }
                .message-box-wrapper {
                    align-items: flex-end;
                    padding: 10px 15px 5px 65px;
                    .message-box {
                        background-color: var(--main-app-color);
                        color: #ffffff;
                    }
                }
            }
            &.same-user-message {
                .profile {
                    visibility: hidden;
                    height: 0;
                }
                .message-box-wrapper {
                    padding-top: 0;
                }
            }
        }
    }
`;

const SingleGroupChat = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const userInfo = getLocalUserInfo();

    const prevItemIsSameUser = (index: number): boolean => {
        return (
            index > 0 &&
            props.chatItems[index - 1].userId == props.chatItems[index].userId
        );
    };

    const isSticker = (message: string): boolean => {
        return message.startsWith(STICKER_KEY);
    };

    const getStickerId = (message: string): string => {
        return message.replace(STICKER_KEY, "");
    };

    return (
        <Container>
            <div className="chat-messages">
                {props.chatItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`chat-item ${
                            item.userId == userInfo.user_id ? "right" : "left"
                        } ${
                            prevItemIsSameUser(index) ? "same-user-message" : ""
                        }`}
                    >
                        <div className="profile">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${
                                        item.userId === 0
                                            ? `${ROOT_PATH}/images/logo.png`
                                            : item.image
                                            ? `${IMAGE_PATH}/users/${item.image}`
                                            : `${ROOT_PATH}/images/no-avatar.png`
                                    })`,
                                }}
                            ></div>
                        </div>
                        <div className="message-box-wrapper">
                            <div className="text-sm text-bold">
                                {!prevItemIsSameUser(index) && item.displayName}
                            </div>
                            {isSticker(item.message) ? (
                                <div className="image-box">
                                    <img
                                        src={`${ROOT_PATH}/images/stickers/${getStickerId(
                                            item.message
                                        )}.png`}
                                        title="sticker"
                                        alt="sticker"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="message-box text-md"
                                    dangerouslySetInnerHTML={{
                                        __html: item.message,
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={ref}></div>
            </div>
        </Container>
    );
});

type Props = {
    room: ChatRoom;
    chatItems: SocketData[];
    onClose: () => void;
};

export default SingleGroupChat;
