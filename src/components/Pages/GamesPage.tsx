import { Component } from "react";
import { Row, Col, Pagination, Empty, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { URLSearchParamsInit } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import withRouter from "./../../hocs/withRouter";
import { Game } from "../../models/game";
import { Filter as FilterModel } from "../../models/filter";
import { getAllGamesApi } from "./../../services/apiServices";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";
import Filter from "../Filter/Filter";
import SelectedFilters from "../Filter/SelectedFilters";
import SortingDesktop from "../Filter/SortingDesktop";
import LoadingModal from "../Utility/Modal/Loading";
import { ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div`
    .toolbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        padding: 20px 0;
    }
    .filter-button-mobile {
        display: none;
    }
    .showing-items {
        margin-bottom: 15px;
        color: #888888;
    }
    .pagination-container {
        padding: 40px 0;
        text-align: center;
    }
    @media (max-width: 767.99px) {
        .toolbar {
            flex-direction: column;
        }
        .closed-filter {
            display: none;
        }
        .filter-button-mobile {
            display: block;
        }
    }
`;

class GamesPage extends Component<Props> {
    state: State = {
        title: "",
        page: 1,
        itemsPerPage: 20,
        total: 0,
        sortingId: 0,
        keyword: "",
        isOpenFilter: false,
        filter: [],
        games: [],
        isLoading: false,
    };

    componentDidMount() {
        let queryStr = this.props.location?.search ?? "";
        this.onGetGameList(queryStr);
    }

    componentWillReceiveProps(nextProps: Props) {
        let queryStr = this.props.location?.search ?? "";
        let nextQueryStr = nextProps.location?.search ?? "";
        if (queryStr !== nextQueryStr) {
            this.onGetGameList(nextQueryStr);
        }
    }

    async onGetGameList(queryStr: string): Promise<void> {
        const { query, sortingId, keyword, page } =
            this.generateQuery(queryStr);

        try {
            this.setState({ isLoading: true, games: [] });
            let { data } = await getAllGamesApi({
                filter: query,
                sorting_id: sortingId,
                keyword,
                page,
            });
            this.setState({
                isLoading: false,
                title: data.title,
                page: data.page,
                itemsPerPage: data.items_per_page,
                total: data.total,
                sortingId: data.sorting_id,
                keyword,
                filter: data.filter,
                games: data.games,
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    generateQuery(queryStr: string): {
        query: Query;
        sortingId: number;
        keyword: string;
        page: number;
    } {
        let query = queryString.parse(queryStr);
        for (let [key, value] of Object.entries(query)) {
            if (typeof value === "string") {
                query[key] = [value];
            }
        }

        let page = 1;
        try {
            page = query.page ? parseInt(query.page[0] as string) : 1;
        } catch (error) {}

        let sortingId = 1;
        try {
            sortingId = query.sorting
                ? parseInt(query.sorting[0] as string)
                : 1;
        } catch (error) {}

        let keyword = "";
        try {
            keyword = query.keyword ? (query.keyword[0] as string) : "";
        } catch (error) {}

        return { query: query as Query, sortingId, keyword, page };
    }

    onSelectFilter(
        filterSlug: string,
        optionSlug: string,
        isSelected: boolean
    ): void {
        let filter: FilterModel[] = cloneDeep(this.state.filter);
        let foundFilterIndex = filter.findIndex(
            (item) => item.slug === filterSlug
        );
        if (foundFilterIndex === -1) {
            return;
        }
        let foundOptionIndex = filter[foundFilterIndex].options.findIndex(
            (item) => item.slug === optionSlug
        );
        if (foundOptionIndex === -1) {
            return;
        }

        filter[foundFilterIndex].options[foundOptionIndex].selected =
            !isSelected;

        this.setState({ filter, page: 1 }, () => this.redirect());
    }

    onRemoveFilter(filterSlug: string, optionSlug: string): void {
        this.onSelectFilter(filterSlug, optionSlug, true);
    }

    onClearFilter(): void {
        let filter: FilterModel[] = cloneDeep(this.state.filter);
        filter.forEach((item) =>
            item.options.forEach((option) => {
                option.selected = false;
            })
        );
        this.setState({ filter, page: 1 }, () => this.redirect());
    }

    onSelectSorting(id: number): void {
        this.setState(
            {
                sortingId: id,
                page: 1,
            },
            () => this.redirect()
        );
    }

    onChangePage(page: number): void {
        this.setState({ page }, () => {
            this.redirect();
            window.scrollTo(0, 0);
        });
    }

    redirect(): void {
        let query: any = {};

        if (this.state.sortingId !== 0) {
            query.sorting = this.state.sortingId;
        }
        if (this.state.page !== 1) {
            query.page = this.state.page;
        }
        if (this.state.keyword !== "") {
            query.keyword = this.state.keyword;
        }

        this.state.filter.forEach((item) =>
            item.options.forEach((option) => {
                if (option.selected) {
                    if (!query.hasOwnProperty(item.slug)) {
                        query[item.slug] = [];
                    }
                    query[item.slug].push(option.slug);
                }
            })
        );
        this.props.navigateSearch &&
            this.props.navigateSearch(`${ROOT_PATH}/games`, {
                ...query,
            });
    }

    toggleFilter() {
        this.setState({ isOpenFilter: !this.state.isOpenFilter });
    }

    render() {
        return (
            <Container>
                <Row gutter={30}>
                    <Col xs={24}>
                        <Title title={this.state.title} />
                        <div className="toolbar">
                            <SelectedFilters
                                filters={this.state.filter}
                                onRemove={this.onRemoveFilter.bind(this)}
                                onClearAll={this.onClearFilter.bind(this)}
                            />
                            <SortingDesktop
                                value={this.state.sortingId}
                                onSelect={this.onSelectSorting.bind(this)}
                            />
                        </div>
                        <p className="showing-items text-sm">
                            Showing {this.state.total}{" "}
                            {this.state.total > 1 ? "items" : "item"}
                        </p>
                        <Button
                            block
                            ghost
                            danger
                            icon={<FilterOutlined />}
                            style={{ marginBottom: 20, borderRadius: 8 }}
                            className="filter-button-mobile"
                            onClick={() => this.toggleFilter()}
                        >
                            {this.state.isOpenFilter
                                ? "Hide Filters"
                                : "Show Filters"}
                        </Button>
                    </Col>
                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ paddingRight: 30 }}
                        className={
                            !this.state.isOpenFilter ? "closed-filter" : ""
                        }
                    >
                        {this.state.filter.length > 0 && (
                            <Filter
                                filters={this.state.filter}
                                onSelect={this.onSelectFilter.bind(this)}
                            />
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <Row gutter={[15, 24]}>
                            {this.state.games.map((game) => (
                                <Col
                                    key={game.id}
                                    className="gutter-row"
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                >
                                    <ProductCard {...game} />
                                </Col>
                            ))}
                        </Row>

                        {this.state.isLoading && (
                            <p className="text-center">Loading...</p>
                        )}
                        {!this.state.isLoading &&
                            this.state.games.length === 0 && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                                    description="No games"
                                />
                            )}

                        <div className="pagination-container">
                            <Pagination
                                current={this.state.page}
                                pageSize={this.state.itemsPerPage}
                                total={this.state.total}
                                hideOnSinglePage={true}
                                showSizeChanger={false}
                                onChange={this.onChangePage.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type State = {
    title: string;
    page: number;
    itemsPerPage: number;
    total: number;
    sortingId: number;
    keyword: string;
    isOpenFilter: boolean;
    filter: FilterModel[];
    games: Game[];
    isLoading: boolean;
};

type Query = {
    [key: string]: string[];
};

type Props = {
    navigateSearch?: (pathname: string, params: URLSearchParamsInit) => void;
    location?: Location;
};

export default withRouter(GamesPage);
