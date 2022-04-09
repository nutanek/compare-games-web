import { Row, Col, message } from "antd";
import { Component } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { Game } from "../../models/game";
import { getHomeApi } from "./../../services/apiServices";
import Title from "./../Utility/Title";
import ProductCard from "../Product/ProductCard/ProductCard";
import LoadingModal from "../Utility/Modal/Loading";

const Container = styled.div``;

class HomePage extends Component {
    state: State = {
        isLoading: false,
        onSales: [],
        mostPopulars: [],
        newReleases: [],
        commingSoons: [],
    };

    componentDidMount() {
        this.getHome();
    }

    async getHome() {
        try {
            this.setState({ isLoading: true });
            let { data: homeData } = await getHomeApi();
            this.setState({
                isLoading: false,
                onSales: homeData.on_sales,
                mostPopulars: homeData.most_populars,
                newReleases: homeData.new_releases,
                commingSoons: homeData.comming_soons,
            });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            message.error(ERRORS.unknown);
        }
    }

    loadingProductCards() {
        return [1, 2, 3, 4, 5, 6].map((no) => (
            <Col
                key={uuidv4()}
                className="gutter-row"
                xs={12}
                sm={12}
                md={8}
                lg={4}
            >
                <ProductCard
                    id={new Date().getTime() + no}
                    name=""
                    image=""
                    price={0}
                    liked={false}
                    platforms={[]}
                />
            </Col>
        ));
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
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.onSales.map((game) => (
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
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.mostPopulars.map((game) => (
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
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.newReleases.map((game) => (
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
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.commingSoons.map((game) => (
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
                <LoadingModal isOpen={this.state.isLoading} />
            </>
        );
    }
}

type State = {
    isLoading: boolean;
    onSales: Game[];
    mostPopulars: Game[];
    newReleases: Game[];
    commingSoons: Game[];
};

export default HomePage;
