import { Row, Col, message } from "antd";
import { Component } from "react";
import styled from "styled-components";
import random from "lodash/random";
import { v4 as uuidv4 } from "uuid";
import { ERRORS, ROOT_PATH, SORTING_ID } from "../../constants/appConstants";
import { Game, platformKeys } from "../../models/game";
import { getHomeApi } from "./../../services/apiServices";
import { T } from "../../services/translateServices";
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
                    price={100}
                    liked={false}
                    rating={0}
                    platforms={[platformKeys[random(2)]]}
                />
            </Col>
        ));
    }

    render() {
        return (
            <>
                <div style={{ marginBottom: 20 }}>
                    <Title
                        title={T("ON_SALES")}
                        seeAllText={T("SEE_ALL")}
                        seeAllLink={`${ROOT_PATH}/games?on_sale=true`}
                    />
                    <Row gutter={[15, 24]}>
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.onSales.map((game) => (
                                  <Col
                                      key={game.id}
                                      className="gutter-row"
                                      xs={12}
                                      sm={12}
                                      md={8}
                                      lg={8}
                                      xl={4}
                                  >
                                      <ProductCard {...game} />
                                  </Col>
                              ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title={T("BEST_RATING")}
                        seeAllText={T("SEE_ALL")}
                        seeAllLink={`${ROOT_PATH}/games?sorting=${SORTING_ID.rating}`}
                    />
                    <Row gutter={[15, 24]}>
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.mostPopulars.map((game) => (
                                  <Col
                                      key={game.id}
                                      className="gutter-row"
                                      xs={12}
                                      sm={12}
                                      md={8}
                                      lg={8}
                                      xl={4}
                                  >
                                      <ProductCard {...game} />
                                  </Col>
                              ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title={T("NEW_RELEASES")}
                        seeAllText={T("SEE_ALL")}
                        seeAllLink={`${ROOT_PATH}/games?released=true`}
                    />
                    <Row gutter={[15, 24]}>
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.newReleases.map((game) => (
                                  <Col
                                      key={game.id}
                                      className="gutter-row"
                                      xs={12}
                                      sm={12}
                                      md={8}
                                      lg={8}
                                      xl={4}
                                  >
                                      <ProductCard {...game} />
                                  </Col>
                              ))}
                    </Row>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <Title
                        title={T("COMING_SOON")}
                        seeAllText={T("SEE_ALL")}
                        seeAllLink={`${ROOT_PATH}/games?coming_soon=true`}
                    />
                    <Row gutter={[15, 24]}>
                        {this.state.isLoading
                            ? this.loadingProductCards()
                            : this.state.commingSoons.map((game) => (
                                  <Col
                                      key={game.id}
                                      className="gutter-row"
                                      xs={12}
                                      sm={12}
                                      md={8}
                                      lg={8}
                                      xl={4}
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
