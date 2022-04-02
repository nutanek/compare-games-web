import { Layout } from "antd";
import styled from "styled-components";
import DesktopHeader from "./../Header/Desktop/DesktopHeader";
import Footer from "../Footer/Footer";

const Content = styled.div`
    display: flex;
    align-items: center;
    padding-top: 25px;
    padding-bottom: 25px;
    > .container {
        min-height: calc(100vh - 240px);
        margin-top: 80px;
    }
`;

const DesktopLayout = (props: Props): JSX.Element => {
    const { children } = props;
    return (
        <Layout>
            <DesktopHeader />
            <Content>
                <div className="container">{children}</div>
            </Content>
            <Footer />
        </Layout>
    );
};

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default DesktopLayout;
