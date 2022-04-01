import { Select } from "antd";
import styled from "styled-components";
import { SORTINGS } from "./../../constants/appConstants";

const { Option } = Select;

const Container = styled.div`
    .ant-select-selector {
        margin-left: 8px;
        border-radius: 8px !important;
    }
`;

const SortingDesktop = (props: Props) => {
    return (
        <Container className="text-sm">
            <span className="text-bold">Sort by:</span>
            <Select defaultValue={1} style={{ width: 200 }}>
                {SORTINGS.map((sorting) => (
                    <Option key={sorting.id} value={sorting.id}>
                        {sorting.name}
                    </Option>
                ))}
            </Select>
        </Container>
    );
};

type Props = {
    // filters: FilterModel[];
};

export default SortingDesktop;
