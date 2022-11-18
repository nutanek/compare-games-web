import styled from "styled-components";
import numeral from "numeral";
import { ROOT_PATH } from "../../constants/appConstants";
import { T } from "../../services/translateServices";
import { SingleGamePrice } from "../../models/game";
import PlatformTags from "../Product/ProductCard/PlatformTags";

const MedalImages = [
    `${ROOT_PATH}/images/medal-1.png`,
    `${ROOT_PATH}/images/medal-2.png`,
    `${ROOT_PATH}/images/medal-3.png`,
];

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 767.99px) {
        gap: 10px !important;
    }
    .price-item {
        display: flex;
        flex-direction: column;
        position: relative;
        flex: 1;
        padding: 25px 0;
        text-align: center;
        border-radius: 8px;
        background-size: cover;
        &-ps {
            background-image: url(${`${ROOT_PATH}/images/bg-price-ps.png`}),
                linear-gradient(
                    to right bottom,
                    #0043a5,
                    #0065bf,
                    #0085d3,
                    #00a4e0,
                    #12c2eb
                );
        }
        &-xbox {
            background-image: url(${`${ROOT_PATH}/images/bg-price-xbox.png`}),
                linear-gradient(
                    to right bottom,
                    #028746,
                    #069858,
                    #0aa96b,
                    #0dba7f,
                    #0fcc93
                );
        }
        &-nintendo {
            background-image: url(${`${ROOT_PATH}/images/bg-price-nintendo.png`}),
                linear-gradient(
                    to right bottom,
                    #e60113,
                    #eb222c,
                    #ee3641,
                    #ef4754,
                    #ef5666
                );
        }
        .medal {
            margin-bottom: 10px;
            img {
                width: 50px;
            }
        }
        .platforms {
            justify-content: center;
            .platform-item {
                padding: 5px 15px;
                font-size: 18px;
                border-radius: 100px;
            }
        }
        @media (max-width: 767.99px) {
            .platforms {
                .platform-item {
                    padding: 3px 10px;
                    font-size: 12px;
                }
            }
            .medal {
                img {
                    width: 40px;
                }
            }
        }
        .original-price {
            color: #ffffff;
            text-decoration: line-through;
        }
        .final-price {
            margin-top: 10px;
            color: #ffffff;
        }
        .no-price {
            color: #ffffff;
            margin: 10px 0;
        }
        .shop-url {
            margin-top: 10px;
            a {
                color: #ffffff;
                text-decoration: underline;
            }
        }
    }
`;

const PricingSection = (props: Props) => {
    return (
        <Container>
            {props.prices.map((item, index) => (
                <div
                    key={item.platform}
                    className={`price-item price-item-${item.platform}`}
                >
                    <div className={`medal medal-${index + 1}`}>
                        <img src={MedalImages[index]} alt="medal" />
                    </div>
                    <PlatformTags platforms={[item.platform]} reverseColor />
                    {item.is_on_platform ? (
                        <>
                            <div className="final-price text-2xl text-bold">
                                {item.final_price > 0
                                    ? T("THB_PRICE", {
                                          price: numeral(
                                              item.final_price
                                          ).format("0,0.00"),
                                      })
                                    : T("FREE")}
                            </div>
                            {item.sale_price > 0 && (
                                <div className="original-price text-md">
                                    {T("THB_PRICE", {
                                        price: numeral(
                                            item.original_price
                                        ).format("0,0.00"),
                                    })}
                                </div>
                            )}
                            <div style={{ flex: 1 }} />
                            {item.shop_url && (
                                <div className="text-sm shop-url">
                                    <a target="_blank" href={item.shop_url}>
                                        {T("GO_SHOP")}
                                    </a>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-price text-md">N/A</div>
                    )}
                </div>
            ))}
        </Container>
    );
};

type Props = {
    prices: SingleGamePrice[];
};

export default PricingSection;
