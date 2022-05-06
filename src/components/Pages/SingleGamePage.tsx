import { Component } from "react";
import { Row, Col, message, Breadcrumb, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { Link, NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import LazyLoad from "react-lazyload";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { SingleGame } from "../../models/game";
import withRouter from "../../hocs/withRouter";
import { getGameApi, updateWishlistApi } from "./../../services/apiServices";
import { epochToDateTime } from "../../services/appServices";
import GenreTags from "../SingleGame/GenreTags";
import LoadingModal from "../Utility/Modal/Loading";
import PricingSection from "../SingleGame/PricingSection";
import Review from "../Review/Review";

const Container = styled.div`
    .breadcrumb {
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .main-image {
        margin-bottom: 30px;
        > .image-wrapper {
            position: relative;
            overflow: hidden;
            height: 100%;
            height: 0;
            padding-bottom: 100%;
            border-radius: 8px;
            background-color: #dddddd;
            > .image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .fav-section {
        margin: 30px 0;
        display: flex;
        gap: 5px;
        align-items: center;
        .fav-icon {
            transition: all 0.3s;
            &:hover {
                transform: scale(1.2);
            }
            &.like {
                color: #cccccc;
            }
            &.liked {
                color: #fe0707;
            }
        }
    }
    .description-section {
        margin: 20px 0;
        white-space: pre-line;
        .title {
            margin-bottom: 20px;
        }
    }
    .properties-section {
        margin: 20px 0;
        table.properties-table {
            width: 100%;
            td:nth-child(1) {
                padding: 10px 10px 10px 0;
                font-weight: bold;
            }
            td:nth-child(2) {
                padding: 10px 0px 10px 10px;
            }
        }
    }
    .ratings-section {
        margin: 20px 0;
        .rating-item {
            height: 100%;
            border: 1px solid #d2d4d9;
            padding: 15px;
            text-align: center;
            .score {
                color: #ff6161;
            }
            .count {
                color: #999999;
            }
        }
    }
    .reviews-section {
        margin: 30px 0;
    }
`;

const initialGameValues = {
    id: 0,
    name: "",
    image: "",
    detail: "",
    release_date: 0,
    developer: "",
    voices: "",
    subtitles: "",
    metacritic_rating: 0,
    metacritic_rating_count: 0,
    user_rating: 0,
    user_rating_count: 0,
    liked: false,
    prices: [],
    genres: [],
};

class SingleGamePage extends Component<Props> {
    state: State = {
        isLoading: false,
        isLikeLoading: false,
        game: initialGameValues,
    };

    componentDidMount() {
        const params = this.props.urlParams;
        this.getGame(params?.id || 0);
    }

    async getGame(id: number) {
        try {
            this.setState({ isLoading: true });
            let { data: game } = await getGameApi({ id });
            this.setState({
                isLoading: false,
                game,
            });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            message.error(ERRORS.unknown);
        }
    }

    async updateWishlist(id: number) {
        try {
            this.setState({ isLikeLoading: true });
            let game = cloneDeep(this.state.game);
            let { data } = await updateWishlistApi({
                action: game.liked ? "REMOVE" : "ADD",
                game_id: id,
            });
            game.liked = !game.liked;
            this.setState({ isLikeLoading: false, game });
            message.success(data?.msg || "Success!");
        } catch (error: any) {
            this.setState({ isLikeLoading: false });
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
    }

    onSuccessReview() {
        const params = this.props.urlParams;
        this.getGame(params?.id || 0);
    }

    render() {
        const { game } = this.state;
        return (
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to={`${ROOT_PATH}/`}>Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={`${ROOT_PATH}/games`}>All Games</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{game.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Row gutter={30}>
                    <Col
                        className="main-image gutter-row"
                        xs={24}
                        sm={24}
                        md={24}
                        lg={8}
                    >
                        <div className="image-wrapper">
                            {game.image && (
                                <img
                                    className="image"
                                    src={game.image}
                                    alt={game.name}
                                />
                            )}
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={16}>
                        <h1 className="text-3xl">{game.name}</h1>
                        <GenreTags genres={game.genres} />
                        <AddToWishlist
                            isLoading={this.state.isLikeLoading}
                            liked={game.liked}
                            onClick={() => this.updateWishlist(game.id)}
                        />
                        <PricingSection prices={game.prices} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} className="description-section">
                        <h2 className="title text-center text-3xl text-bold">
                            Description
                        </h2>
                        <p
                            className="description text-md"
                            dangerouslySetInnerHTML={{ __html: game.detail }}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} className="properties-section">
                        <table className="properties-table text-md">
                            <tbody>
                                <tr>
                                    <td>Release date:</td>
                                    <td>
                                        {epochToDateTime(
                                            game.release_date,
                                            "mmm d, yyyy"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Developer:</td>
                                    <td>{game.developer || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Voice:</td>
                                    <td>{game.voices || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Subtitles:</td>
                                    <td>{game.subtitles || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} className="ratings-section">
                        <h2 className="text-lg text-bold">Ratings</h2>
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={12}>
                                <div className="rating-item">
                                    <div className="text-lg text-bold">
                                        Metacritic Rating
                                    </div>
                                    <div className="text-bold">
                                        <span className="text-5xl score">
                                            {game.metacritic_rating || "-"}{" "}
                                        </span>
                                        <span className="text-xl">/ 5</span>
                                    </div>
                                    <div className="text-sm count">
                                        Critics: {game.metacritic_rating_count}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} lg={12}>
                                <div className="rating-item">
                                    <div className="text-lg text-bold">
                                        Consoles Rating
                                    </div>
                                    <div className="text-bold">
                                        <span className="text-5xl score">
                                            {game.user_rating || "-"}{" "}
                                        </span>
                                        <span className="text-xl">/ 5</span>
                                    </div>
                                    <div className="text-sm count">
                                        Users: {game.user_rating_count}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {!this.state.isLoading && game.id && (
                    <LazyLoad>
                        <Row>
                            <Col xs={24} className="reviews-section">
                                <h2 className="text-lg text-bold">
                                    Showing {game.user_rating_count}{" "}
                                    {game.user_rating_count > 1
                                        ? "Reviews"
                                        : "Review"}
                                </h2>
                                <Row>
                                    <Col xs={24}>
                                        <Review
                                            gameId={game.id}
                                            onSuccessReview={() =>
                                                this.onSuccessReview()
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </LazyLoad>
                )}

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type AddToWishlistType = {
    isLoading: boolean;
    liked: boolean;
    onClick: () => void;
};

const AddToWishlist = (props: AddToWishlistType) => {
    return (
        <div className="fav-section">
            <div
                className={`fav-icon ${
                    props.liked ? "liked" : "like"
                } pointer text-3xl`}
            >
                {props.isLoading ? (
                    <Spin />
                ) : (
                    <HeartFilled onClick={() => props.onClick()} />
                )}
            </div>
            <div className="text-md pointer" onClick={() => props.onClick()}>
                {props.liked ? "Remove from Wish List" : "Add to Wish List"}
            </div>
        </div>
    );
};

type State = {
    isLoading: boolean;
    isLikeLoading: boolean;
    game: SingleGame;
};

type Props = {
    urlParams?: {
        id: number;
    };
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(SingleGamePage);
