import { Row, Col } from "antd";
import { Component } from "react";
import styled from "styled-components";
import { Game } from "../../models/game";
import { Filter } from "../../models/filter";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";

import { GAME_WITH_FILTER } from "./../../constants/mockdata";
import { ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div``;

class GamesPage extends Component {
    state: State = {
        title: "",
        page: 1,
        totalPage: 10,
        sortingId: 1,
        filter: [],
        games: [],
    };

    componentDidMount() {
        this.setState({
            title: GAME_WITH_FILTER.title,
            page: GAME_WITH_FILTER.page,
            totalPage: GAME_WITH_FILTER.total_page,
            sortingId: GAME_WITH_FILTER.sorting_id,
            filter: GAME_WITH_FILTER.filter,
            games: GAME_WITH_FILTER.games,
        });
    }

    render() {
        return (
            <div>
                <Title title={this.state.title} />
                <Row gutter={15}>
                    <Col xs={12} sm={12} md={8} lg={6}>
                        Filter
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
                    </Col>
                </Row>
            </div>
        );
    }
}

type State = {
    title: string;
    page: number;
    totalPage: number;
    sortingId: number;
    filter: Filter[];
    games: Game[];
};

export default GamesPage;
