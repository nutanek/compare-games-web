import { Collapse, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Filter as FilterModel } from "./../../models/filter";
import { langSlug } from "../../services/translateServices";

const { Panel } = Collapse;

const Container = styled(Collapse)`
    background-color: transparent;
    .filter-name,
    .ant-collapse-arrow {
        color: #0f79af;
    }
    .ant-collapse-header {
        padding-left: 0 !important;
    }
    .ant-collapse-arrow {
        right: 0 !important;
    }
    .ant-collapse-item {
        border: none !important;
    }
    .ant-collapse-content-box {
        padding-right: 0 !important;
    }
    .filter-option {
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
    }
`;

const Filter = (props: Props) => {
    return (
        <Container
            bordered={false}
            defaultActiveKey={props.filters.map((el) => el.slug)}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
            )}
        >
            {props.filters.map((filter) => (
                <Panel
                    key={filter.slug}
                    header={
                        <span className="filter-name text-lg">
                            {langSlug === "en" ? filter.name : filter.name_th}
                        </span>
                    }
                >
                    {filter.options.map((option) => (
                        <div key={option.slug} className="filter-option">
                            <label
                                htmlFor={`filter-${filter.name}-${option.slug}`}
                                className="name"
                            >
                                {langSlug === "en"
                                    ? option.name
                                    : option.name_th || option.name}
                            </label>
                            <div className="check">
                                <Checkbox
                                    id={`filter-${filter.name}-${option.slug}`}
                                    checked={option.selected}
                                    onChange={() =>
                                        props.onSelect(
                                            filter.slug,
                                            option.slug,
                                            option.selected
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </Panel>
            ))}
        </Container>
    );
};

type Props = {
    filters: FilterModel[];
    onSelect: (
        filterSlug: string,
        optionSlug: string,
        isSelected: boolean
    ) => void;
};

export default Filter;
