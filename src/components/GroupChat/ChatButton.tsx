import styled from "styled-components";
import { ROOT_PATH } from "../../constants/appConstants";
import { T } from "./../../services/translateServices";

const Container = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: fixed;
    bottom: 0;
    z-index: 99;
    right: 27px;
    width: 300px;
    padding: 15px;
    background: #ff5a5a;
    color: #ffffff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: all 0.3s;
    .icon {
        img {
            width: 30px;
        }
    }
    &:hover {
        background: #db4141;
    }
`;

const ChatButton = (props: Props) => {
    return (
        <Container
            className="chat-float-button"
            onClick={() => props.onClick()}
        >
            <div className="icon">
                <img src={`${ROOT_PATH}/images/chat-icon.png`} alt="icon" />
            </div>
            <div className="text-md text-bold">{T("CHAT_ROOMS")}</div>
        </Container>
    );
};

type Props = {
    onClick: () => void;
};
export default ChatButton;
