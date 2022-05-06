import { forwardRef } from "react";
import styled from "styled-components";
import { getLocalUserInfo } from "../../services/appServices";
import { SocketData } from "../../models/sokect";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .chat-messages {
        flex: 1;
        .chat-item {
            display: flex;
            .avatar {
                background-color: #dddddd;
                background-size: cover;
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

    let body = document.body,
        html = document.documentElement;

    const prevItemIsSameUser = (index: number): boolean => {
        return (
            index > 0 &&
            props.chatItems[index - 1].userId == props.chatItems[index].userId
        );
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
                                    backgroundImage: `url(${item.image})`,
                                }}
                            ></div>
                        </div>
                        <div className="message-box-wrapper">
                            <div className="message-box text-md">
                                {item.message}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={ref}></div>
            </div>
        </Container>
    );
});

type Props = {
    chatItems: SocketData[];
    onClose: () => void;
};

export default SingleGroupChat;
