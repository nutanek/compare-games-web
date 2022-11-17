import { Select } from "antd";
import styled from "styled-components";
import { SORTINGS } from "./../../constants/appConstants";
import { T, langSlug } from "./../../services/translateServices";

const { Option } = Select;

const Container = styled.div`
    > .title {
        padding-right: 8px;
    }
    .ant-select-selector {
        border-radius: 8px !important;
    }
`;

const SortingDesktop = (props: Props) => {
    return (
        <Container className="text-sm">
            <span className="text-bold title">{T("SORT_BY")}:</span>
            <Select
                style={{ width: 200 }}
                value={props.value}
                onChange={props.onSelect.bind(this)}
            >
                {SORTINGS.map((sorting) => (
                    <Option key={sorting.id} value={sorting.id}>
                        {langSlug === "en" ? sorting.name : sorting.nameTh}
                    </Option>
                ))}
            </Select>
        </Container>
    );
};

type Props = {
    value: number;
    onSelect: (id: number) => void;
};

export default SortingDesktop;
