import { Row, Col, Select, Pagination } from "antd";
import { Component } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import withRouter from "./../../hocs/withRouter";
import { Game } from "../../models/game";
import { Filter as FilterModel } from "../../models/filter";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";
import Filter from "../Filter/Filter";
import SelectedFilters from "../Filter/SelectedFilters";
import SortingDesktop from "../Filter/SortingDesktop";
import LoadingModal from "../Utility/Modal/Loading";

import { GAME_WITH_FILTER } from "./../../constants/mockdata";
import { ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div`
    .toolbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        padding: 20px 0;
    }
    .showing-items {
        margin-bottom: 15px;
        color: #888888;
    }
    .pagination-container {
        padding: 40px 0;
        text-align: center;
    }
`;

class GamesPage extends Component<Props> {
    state: State = {
        title: "",
        page: 1,
        total: 0,
        sortingId: 0,
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
        const query = this.generateQuery(queryStr);
        this.setState({ isLoading: true, games: [] });
        await setTimeout(
            () =>
                this.setState(
                    {
                        title: GAME_WITH_FILTER.title,
                        page: GAME_WITH_FILTER.page,
                        total: GAME_WITH_FILTER.total,
                        sortingId: GAME_WITH_FILTER.sorting_id,
                        filter: GAME_WITH_FILTER.filter,
                        games: GAME_WITH_FILTER.games,
                    },
                    () => {
                        this.onSetSelectedFilter(query);
                        this.setState({ isLoading: false });
                    }
                ),

            300
        );
    }

    generateQuery(queryStr: string): Query {
        let query = queryString.parse(queryStr);
        for (let [key, value] of Object.entries(query)) {
            if (typeof value === "string") {
                query[key] = [value];
            }
        }
        return query as Query;
    }

    onSetSelectedFilter(query: Query): void {
        let filter = cloneDeep(this.state.filter);
        filter.forEach((item) =>
            item.options.forEach((option) => {
                if (
                    query[item.slug] &&
                    query[item.slug].includes(option.slug)
                ) {
                    option.selected = true;
                }
            })
        );
        let state = { filter };
        if (query.sorting?.length > 0 && query.sorting[0] !== "0") {
            state = {
                ...state,
                ...{ sortingId: parseInt(query.sorting[0]) },
            };
        }
        if (query.page?.length > 0 && query.page[0] !== "1") {
            state = {
                ...state,
                ...{ page: parseInt(query.page[0]) },
            };
        }
        this.setState(state);
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

        this.setState({ filter }, () => this.redirect());
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
        this.setState({ filter }, () => this.redirect());
    }

    onSelectSorting(id: number): void {
        this.setState(
            {
                sortingId: id,
            },
            () => this.redirect()
        );
    }

    onChangePage(page: number): void {
        this.setState({ page }, () => this.redirect());
    }

    redirect(): void {
        let query: any = {};

        if (this.state.sortingId !== 0) {
            query.sorting = this.state.sortingId;
        }
        if (this.state.page !== 1) {
            query.page = this.state.page;
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

    render() {
        return (
            <Container>
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
                <Row gutter={40}>
                    <Col xs={12} sm={12} md={8} lg={6}>
                        <Filter
                            filters={this.state.filter}
                            onSelect={this.onSelectFilter.bind(this)}
                        />
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
                        <div className="pagination-container">
                            <Pagination
                                current={this.state.page}
                                pageSize={24}
                                total={this.state.total}
                                hideOnSinglePage={true}
                                showSizeChanger={false}
                                onChange={this.onChangePage.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>

                {/* <LoadingModal isOpen={this.state.isLoading}/> */}
            </Container>
        );
    }
}

type State = {
    title: string;
    page: number;
    total: number;
    sortingId: number;
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
