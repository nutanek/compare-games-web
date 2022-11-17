import { useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { NavigateFunction } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { ROOT_PATH } from "../../../constants/appConstants";
import { T } from "../../../services/translateServices";
import withRouter from "../../../hocs/withRouter";

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

const SearchBoxDesktop = (props: Props) => {
    let [keyword, setKeyword] = useState<string>("");

    function onSearch() {
        props.navigate &&
            props.navigate(`${ROOT_PATH}/games?keyword=${keyword}`);
    }

    return (
        <Container>
            <Input
                allowClear
                className="text-md"
                size="large"
                placeholder={T("SEARCH_GAME")}
                prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
                onChange={(e) => setKeyword(e.target.value)}
                onPressEnter={() => onSearch()}
            />
        </Container>
    );
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(SearchBoxDesktop);
