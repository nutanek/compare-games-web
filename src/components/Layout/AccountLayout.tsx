import { Row, Col } from "antd";
import styled from "styled-components";
import DesktopHeader from "./../Header/Desktop/DesktopHeader";
import Footer from "../Footer/Footer";
import AccountSidebar from "../Account/AccountSidebar";

const Container = styled.div`
    padding-top: 20px;
`;

const AccountLayout = (props: Props): JSX.Element => {
    const { children } = props;
    return (
        <Container>
            <Row gutter={[25, 15]}>
                <Col xs={24} sm={24} md={6} lg={4} xl={4}>
                    <AccountSidebar />
                </Col>
                <Col xs={24} sm={24} md={18} lg={20} xl={20}>
                    <h2 className="text-3xl text-bold">{props.title}</h2>
                    <div>{children}</div>
                </Col>
            </Row>
        </Container>
    );
};

type Props = {
    title: string;
    children: JSX.Element | JSX.Element[];
};

export default AccountLayout;
