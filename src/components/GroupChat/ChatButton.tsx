import {Button} from 'antd'
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    bottom: 0;
    right: 30px;
    width: 300px;
    padding: 15px;
    cursor: pointer;
    background: #ddd;
`

const ChatButton = (props: Props) => {
    return <Container onClick={() => props.onClick()}>Chat</Container>;
};

type Props = {
    onClick: () => void;
};
export default ChatButton;
