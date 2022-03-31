import { Row, Col } from "antd";
import { Component } from "react";
import styled from "styled-components";
import { Home } from "../../models/game";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";

import { HOME_API } from "./../../constants/mockdata";

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
            ...HOME_API,
        });
    }

    render() {
        return (
            <>
                <div style={{ marginBottom: 20 }}>
                    <Title title="On Sales" />
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
                    <Title title="Most  Popular" />
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
                    <Title title="New Releases" />
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
                    <Title title="Coming Soon" />
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

type State = Home & {};

export default HomePage;
