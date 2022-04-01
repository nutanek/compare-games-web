import { Layout } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROOT_PATH } from "../../constants/appConstants";
import Logo from "./../../images/logo.png";

const Container = styled(Layout.Footer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--main-app-color);
    .logo {
        display: flex;
        align-items: center;
        padding: 15px 0;
        img {
            height: 40px;
        }
        .title {
            padding-left: 10px;
            color: #ffffff;
        }
    }
    .copyright {
        padding: 15px 0;
        color: #ffffff;
    }
    @media screen and (max-width: 576px) {
        flex-direction: column;
        justify-content: center;
    }
`;

const Footer = () => {
    return (
        <Container>
            <Link
                to={`${ROOT_PATH}/`}
                className="logo text-md text-bold pointer"
            >
                <img src={Logo} alt="logo" />
                <div className="title">Consoles</div>
            </Link>
            <div className="copyright text-md">© Consoles 2022</div>
        </Container>
    );
};

export default Footer;
