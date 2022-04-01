import { Row, Col } from "antd";
import { Component } from "react";
import styled from "styled-components";
import { Game } from "../../models/game";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";

import { HOME_API } from "./../../constants/mockdata";
import { ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div``;

class HomePage extends Component {
    state: State = {
        onSales: [],
        mostPopulars: [],
        newReleases: [],
        commingSoons: [],
    };

    componentDidMount() {
        this.setState({
            onSales: HOME_API.on_sales,
            mostPopulars: HOME_API.most_populars,
            newReleases: HOME_API.new_releases,
            commingSoons: HOME_API.comming_soons,
        });
    }

    render() {
        return (
            <>
                <div style={{ marginBottom: 20 }}>
                    <Title
                        title="On Sales"
                        seeAllText="See All"
                        seeAllLink={`${ROOT_PATH}/games`}
                    />
                    <Row gutter={15}>
                        {this.state.onSales.map((game) => (
                            <Col
                                key={game.id}
                                className="gutter-row"
                                xs={12}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <ProductCard {...game} />
                            </Col>
                        ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title="Most Popular"
                        seeAllText="See All"
                        seeAllLink={`${ROOT_PATH}/games`}
                    />
                    <Row gutter={15}>
                        {this.state.mostPopulars.map((game) => (
                            <Col
                                key={game.id}
                                className="gutter-row"
                                xs={12}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <ProductCard {...game} />
                            </Col>
                        ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title="New Releases"
                        seeAllText="See All"
                        seeAllLink={`${ROOT_PATH}/games`}
                    />
                    <Row gutter={15}>
                        {this.state.newReleases.map((game) => (
                            <Col
                                key={game.id}
                                className="gutter-row"
                                xs={12}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <ProductCard {...game} />
                            </Col>
                        ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title="Coming Soon"
                        seeAllText="See All"
                        seeAllLink={`${ROOT_PATH}/games`}
                    />
                    <Row gutter={15}>
                        {this.state.commingSoons.map((game) => (
                            <Col
                                key={game.id}
                                className="gutter-row"
                                xs={12}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <ProductCard {...game} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </>
        );
    }
}

// const HomePage = (props: Home) => {
//     return <>{props.test}</>;
// };

type State = {
    onSales: Game[];
    mostPopulars: Game[];
    newReleases: Game[];
    commingSoons: Game[];
};

export default HomePage;
