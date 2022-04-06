import { Row, Col, Select, Pagination, Empty } from "antd";
import { Component } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import withRouter from "./../../hocs/withRouter";
import { Game } from "../../models/game";
import { getWishlistApi } from "./../../services/apiServices";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";
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
    .showing-items {
        margin-bottom: 15px;
        color: #888888;
    }
    .pagination-container {
        padding: 40px 0;
        text-align: center;
    }
`;

class WishListPage extends Component<Props> {
    state: State = {
        page: 1,
        total: 0,
        games: [],
        isLoading: false,
    };

    componentDidMount() {
        // let queryStr = this.props.location?.search ?? "";
        // this.onGetGameList(queryStr);

        this.onGetGameList(1);
    }

    componentWillReceiveProps(nextProps: Props) {
        // let queryStr = this.props.location?.search ?? "";
        // let nextQueryStr = nextProps.location?.search ?? "";
        // if (queryStr !== nextQueryStr) {
        //     this.onGetGameList(nextQueryStr);
        // }
    }

    async onGetGameList(page: number): Promise<void> {
        // const { query, sortingId, page } = this.generateQuery(queryStr);

        try {
            this.setState({ isLoading: true });
            let { data } = await getWishlistApi({
                page,
            });
            this.setState({
                isLoading: false,
                page: data.page,
                total: data.total,
                games: data.games,
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }

    // generateQuery(queryStr: string): {
    //     query: Query;
    //     sortingId: number;
    //     page: number;
    // } {
    //     let query = queryString.parse(queryStr);
    //     for (let [key, value] of Object.entries(query)) {
    //         if (typeof value === "string") {
    //             query[key] = [value];
    //         }
    //     }
    //     let page = 1;
    //     try {
    //         page = query.page ? parseInt(query.page[0] as string) : 1;
    //     } catch (error) {}
    //     let sortingId = 1;
    //     try {
    //         sortingId = query.sorting
    //             ? parseInt(query.sorting[0] as string)
    //             : 1;
    //     } catch (error) {}
    //     return { query: query as Query, sortingId, page };
    // }

    onChangePage(page: number): void {
        this.setState({ page }, () => {
            this.redirect();
            window.scrollTo(0, 0);
        });
    }

    redirect(): void {
        // let query: any = {};
        // if (this.state.sortingId !== 0) {
        //     query.sorting = this.state.sortingId;
        // }
        // if (this.state.page !== 1) {
        //     query.page = this.state.page;
        // }
        // this.state.filter.forEach((item) =>
        //     item.options.forEach((option) => {
        //         if (option.selected) {
        //             if (!query.hasOwnProperty(item.slug)) {
        //                 query[item.slug] = [];
        //             }
        //             query[item.slug].push(option.slug);
        //         }
        //     })
        // );
        // this.props.navigateSearch &&
        //     this.props.navigateSearch(`${ROOT_PATH}/games`, {
        //         ...query,
        //     });
    }

    onLike(id: number): void {
        this.onGetGameList(this.state.page);
    }

    render() {
        return (
            <Container>
                <Title title="My Wishlist" />
                <Row gutter={[15, 24]}>
                    {this.state.games.map((game) => (
                        <Col
                            key={game.id}
                            className="gutter-row"
                            xs={12}
                            sm={12}
                            md={8}
                            lg={4}
                        >
                            <ProductCard
                                {...game}
                                onLike={this.onLike.bind(this)}
                            />
                        </Col>
                    ))}
                </Row>

                {!this.state.isLoading && this.state.games.length === 0 && (
                    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="No games" />
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

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type State = {
    page: number;
    total: number;
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

export default withRouter(WishListPage);
