import { Component } from "react";
import { Row, Col, message, Breadcrumb, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { Link, NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { SingleGame } from "../../models/game";
import withRouter from "../../hocs/withRouter";
import { getGameApi, updateWishlistApi } from "./../../services/apiServices";
import { epochToDateTime } from "../../services/appServices";
import GenreTags from "../SingleGame/GenreTags";
import LoadingModal from "../Utility/Modal/Loading";
import PricingSection from "../SingleGame/PricingSection";

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
        .title {
            margin-bottom: 20px;
        }
    }
    .properties-section {
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
            this.setState({ isLoading: true });
            let game = cloneDeep(this.state.game);
            let { data } = await updateWishlistApi({
                action: game.liked ? "REMOVE" : "ADD",
                game_id: id,
            });
            game.liked = !game.liked;
            this.setState({ isLoading: false, game });

            // setIsLoading(false);
            // setIsLiked((isLiked) => !isLiked);
            // onLike && onLike(id);
            message.success(data?.msg || "Success!");
        } catch (error: any) {
            this.setState({ isLoading: false });
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
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
                            <img
                                className="image"
                                src={game.image}
                                alt={game.name}
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={16}>
                        <h1 className="text-3xl">{game.name}</h1>
                        <GenreTags genres={game.genres} />
                        <AddToWishlist
                            isLoading={this.state.isLoading}
                            liked={game.liked}
                            onClick={() => this.updateWishlist(game.id)}
                        />
                        <PricingSection prices={game.prices} />
                    </Col>
                </Row>

                <Row className="description-section">
                    <Col>
                        <h2 className="title text-center text-3xl text-bold">
                            Description
                        </h2>
                        <p
                            className="description text-md"
                            dangerouslySetInnerHTML={{ __html: game.detail }}
                        />
                    </Col>
                </Row>

                <Row className="properties-section">
                    <Col style={{ width: "100%" }}>
                        <table className="properties-table text-md">
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
                                <td>{game.developer}</td>
                            </tr>
                            <tr>
                                <td>Voice:</td>
                                <td>{game.voices}</td>
                            </tr>
                            <tr>
                                <td>Subtitles:</td>
                                <td>{game.subtitles}</td>
                            </tr>
                        </table>
                    </Col>
                </Row>

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
