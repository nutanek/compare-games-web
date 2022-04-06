import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Game } from "../../../models/game";
import withSearchGames from "./../../../hocs/withSearchGames";

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
    return (
        <Container>
            <Input
                className="text-md"
                size="large"
                placeholder="Search Game"
                prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
                onChange={e => props.onChangeKeyword && props.onChangeKeyword(e.target.value)}
            />
        </Container>
    );
};

type Props = {
    keyword?: string;
    isLoadingSearch?: boolean;
    searchResult?: Game[];
    onChangeKeyword?: (keyword: string) => void;
};

export default withSearchGames(SearchBoxDesktop);
