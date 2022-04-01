import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Filter as FilterModel, FilterOption } from "./../../models/filter";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .btn {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 8px;
        gap: 8px;
        transition: all 0.4s;
        &-clear {
            background-color: #ff5a5a;
            color: #ffffff;
        }
        &-item {
            background-color: #d2d4d9;
        }
        &:hover {
            background-color: var(--main-app-color);
            color: #ffffff;
        }
    }
`;

const SelectedFilters = (props: Props) => {
    let selecteds: Selected[] = [];
    props.filters.forEach((filter) =>
        filter.options.forEach((option) => {
            if (option.selected) {
                selecteds.push({ ...option, filterSlug: filter.slug });
            }
        })
    );

    return (
        <Container>
            {selecteds.length > 0 && (
                <div className="btn btn-clear">
                    <DeleteOutlined />
                    <div className="name">Clear</div>
                </div>
            )}
            {selecteds.map((item) => (
                <div
                    key={item.filterSlug + item.slug}
                    className="btn btn-item text-sm"
                    onClick={() => props.onRemove(item.filterSlug, item.slug)}
                >
                    <div className="name">{item.name}</div> <CloseOutlined />
                </div>
            ))}
        </Container>
    );
};

type Selected = FilterOption & {
    filterSlug: string;
};

type Props = {
    filters: FilterModel[];
    onRemove: (filterSlug: string, optionSlug: string) => void;
};

export default SelectedFilters;
