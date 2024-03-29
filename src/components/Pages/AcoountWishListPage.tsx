import { Row, Col, Pagination, Empty, Result } from "antd";
import { Component } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { ROOT_PATH } from "../../constants/appConstants";
import { Game } from "../../models/game";
import { getWishlistApi } from "./../../services/apiServices";
import { isLoggedIn as checkIsLoggedIn } from "./../../services/appServices";
import { T, langSlug } from "../../services/translateServices";
import withRouter from "../../hocs/withRouter";
import ProductCard from "../Product/ProductCard/ProductCard";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const Container = styled.div`
    .pagination-container {
        padding: 40px 0;
        text-align: center;
    }
`;

class AcoountWishListPage extends Component<Props> {
    state: State = {
        page: 1,
        total: 0,
        games: [],
        isLoading: false,
    };

    componentDidMount() {
        let queryStr = this.props.location?.search ?? "";
        let query = queryString.parse(queryStr);
        let page = parseInt(query.page as string) || 1;
        this.setState({ page });
        this.onGetGameList(page);
    }

    async onGetGameList(page: number): Promise<void> {
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

    onChangePage(page: number): void {
        this.setState({ page }, () => {
            window.scrollTo(0, 0);
            this.onGetGameList(page);
            this.props.navigateSearch &&
                this.props.navigateSearch(`${ROOT_PATH}/account/wishlist`, {
                    page: page.toString(),
                });
        });
    }

    onLike(id: number): void {
        this.onGetGameList(this.state.page);
    }

    render() {
        const isLoggedIn = checkIsLoggedIn();

        if (!isLoggedIn) {
            return (
                <Result
                    status="info"
                    title={
                        langSlug === "en"
                            ? "Please login before view your wish list!"
                            : "กรุณาเข้าสู่ระบบก่อนดูรายการที่โปรด"
                    }
                    extra={
                        langSlug === "en"
                            ? "Redirecting to login..."
                            : "กำลังไปหน้า เข้าสู่ระบบ..."
                    }
                />
            );
        }

        return (
            <Container>
                <AccountLayout title={T("WISH_LIST")}>
                    <>
                        <Row gutter={[15, 24]}>
                            {this.state.games.map((game) => (
                                <Col
                                    key={game.id}
                                    className="gutter-row"
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={6}
                                >
                                    <ProductCard
                                        {...game}
                                        onLike={this.onLike.bind(this)}
                                    />
                                </Col>
                            ))}
                        </Row>

                        {!this.state.isLoading &&
                            this.state.games.length === 0 && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                                    description={T("NO_GAMES")}
                                />
                            )}

                        <div className="pagination-container">
                            <Pagination
                                current={this.state.page}
                                pageSize={24}
                                total={this.state.total}
                                hideOnSinglePage={this.state.page === 1}
                                showSizeChanger={false}
                                onChange={this.onChangePage.bind(this)}
                            />
                        </div>
                    </>
                </AccountLayout>

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

type Props = {
    navigateSearch?: (pathname: string, params: URLSearchParamsInit) => void;
    location?: Location;
};

export default withRouter(AcoountWishListPage);
