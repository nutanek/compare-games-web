import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const Container = styled.div`
    .ant-input-affix-wrapper {
        background-color: transparent;
        border-radius: 8px;
        .ant-input-prefix {
            margin-left: 15px;
            margin-right: 15px;
        }
        input {
            background-color: transparent;
            color: #ffffff;
        }
    }
`;

const SearchBoxDesktop = () => {
    return (
        <Container>
            <Input
                className="text-md"
                size="large"
                placeholder="Search Game"
                prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
            />
        </Container>
    );
};

export default SearchBoxDesktop;
