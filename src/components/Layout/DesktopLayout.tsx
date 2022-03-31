import { Layout } from "antd";
import DesktopHeader from "./../Header/Desktop/DesktopHeader";

const { Content } = Layout;

const DesktopLayout = (props: Props): JSX.Element => {
    return (
        <Layout>
            <DesktopHeader />
            <div className="container">sasas</div>
        </Layout>
    );
};

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default DesktopLayout;
