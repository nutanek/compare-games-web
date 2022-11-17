import { Dropdown, Menu, Space, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { LANGUAGES, ROOT_PATH } from "../../constants/appConstants";
import {
    langSlug,
    changeLanguage,
    LangSlug,
} from "../../services/translateServices";

const Container = styled(Dropdown)`
    .wrapper {
        color: #ffffff;
    }
`;

const menu = (
    <Menu>
        {Object.keys(LANGUAGES).map((key) => (
            <Menu.Item
                key={key}
                onClick={() => changeLanguage(key as LangSlug)}
            >
                <Space className="wrapper">
                    <Avatar
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        src={`${ROOT_PATH}/images/languages/${key}.png`}
                    />
                    <div>{LANGUAGES[key as keyof typeof LANGUAGES]}</div>
                </Space>
            </Menu.Item>
        ))}
    </Menu>
);

const LanguageSelector = () => {
    return (
        <Container overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
                <Space className="wrapper">
                    <Avatar
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        src={`${ROOT_PATH}/images/languages/th.png`}
                    />
                    <div>{LANGUAGES[langSlug]}</div>
                    <DownOutlined />
                </Space>
            </a>
        </Container>
    );
};

export default LanguageSelector;
