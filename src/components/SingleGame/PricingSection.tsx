import styled from "styled-components";
import numeral from "numeral";
import { ROOT_PATH } from "../../constants/appConstants";
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
    .price-item {
        position: relative;
        flex: 1;
        padding: 30px 0;
        text-align: center;
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
            color: #808080;
            text-decoration: line-through;
        }
        .final-price {
            margin: 10px 0;
            color: #fe0707;
        }
        .no-price {
            color: #808080;
            margin: 10px 0;
        }
        &:not(:first-child):after {
            content: "";
            position: absolute;
            height: 50%;
            width: 1px;
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%);
            background-color: #cccccc;
        }
    }
`;

const PricingSection = (props: Props) => {
    return (
        <Container>
            {props.prices.map((item, index) => (
                <div key={item.platform} className="price-item">
                    <div className={`medal medal-${index + 1}`}>
                        <img src={MedalImages[index]} alt="medal" />
                    </div>
                    <PlatformTags platforms={[item.platform]} />
                    {item.is_on_platform ? (
                        <>
                            <div className="final-price text-2xl text-bold">
                                {item.final_price > 0
                                    ? `THB ${numeral(item.final_price).format(
                                          "0,0.00"
                                      )}`
                                    : "Free"}
                            </div>
                            {item.sale_price > 0 && (
                                <div className="original-price text-lg">
                                    THB{" "}
                                    {numeral(item.original_price).format(
                                        "0,0.00"
                                    )}
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
