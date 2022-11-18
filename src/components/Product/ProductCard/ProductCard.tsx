import { useRef, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { message, Spin } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import numeral from "numeral";
import LazyLoad from "react-lazyload";
import { ERRORS, IMAGE_PATH, ROOT_PATH } from "../../../constants/appConstants";
import { PlatformKey } from "../../../models/game";
import { updateWishlistApi } from "../../../services/apiServices";
import { T } from "../../../services/translateServices";
import PlatformTags from "./PlatformTags";
import MetacriticIcon from "./../../../images/metacritic-icon.svg";

const Container = styled.div`
    .image-wrapper {
        position: relative;
        overflow: hidden;
        height: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 8px;
        background-color: #dddddd;
        .image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s;
        }
        .rating-score {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 3px 5px;
            z-index: 9;
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
            border-radius: 8px;
            color: #ffffff;
            background-color: rgba(26, 36, 47, 0.8);
            img {
                vertical-align: sub;
                width: 18px;
                height: 18px;
            }
        }
    }
    .name {
        margin: 15px 0;
        height: 40px;
    }
    .price-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
            color: #fe0707;
        }
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
    :hover {
        .image-wrapper .image {
            -webkit-transform: rotate(5deg) scale(1.2);
            -ms-transform: rotate(5deg) scale(1.2);
            transform: rotate(5deg) scale(1.2);
        }
        .name a {
            color: #1890ff;
        }
    }
`;

const ProductCard = ({
    id,
    name,
    image,
    price,
    liked,
    platforms,
    rating,
    onLike,
}: Props) => {
    const refImage = useRef<HTMLImageElement>(null);
    let [isLoading, setIsLoading] = useState(false);
    let [isLiked, setIsLiked] = useState(liked);

    function removePlaceholder() {
        const node = refImage.current;
        node?.classList.add("fade-in-image");
        node?.classList.remove("opacity-0");
    }

    async function updateWishlist() {
        try {
            setIsLoading(true);
            let { data } = await updateWishlistApi({
                action: isLiked ? "REMOVE" : "ADD",
                game_id: id,
            });
            setIsLoading(false);
            setIsLiked((isLiked) => !isLiked);
            onLike && onLike(id);
            message.success(data?.msg || T("SUCCESS"));
        } catch (error: any) {
            setIsLoading(false);
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
    }

    return (
        <Container>
            <Link to={`${ROOT_PATH}/game/${id}`}>
                <div className="image-wrapper">
                    {!!rating && (
                        <div className="rating-score" title="Metacritic Score">
                            <div>
                                <img src={MetacriticIcon} />
                            </div>
                            <div className="text-bold">{rating}</div>
                        </div>
                    )}
                    {image !== "" && (
                        <LazyLoad>
                            <img
                                ref={refImage}
                                className="image opacity-0"
                                onLoad={removePlaceholder}
                                onError={removePlaceholder}
                                src={`${IMAGE_PATH}/games/${image}`}
                                alt={name}
                            />
                        </LazyLoad>
                    )}
                </div>
            </Link>

            <PlatformTags platforms={platforms} />
            <div className="name text-sm text-bold text-ellipsis-2">
                <Link
                    to={`${ROOT_PATH}/game/${id}`}
                    className="text-primary-color"
                >
                    {name}
                </Link>
            </div>
            <div className="price-wrapper">
                <div className="price text-sm text-bold">
                    {price > 0
                        ? T("THB_PRICE", {
                              price: numeral(price).format("0,0.00"),
                          })
                        : T("FREE")}
                </div>
                <div
                    className={`fav-icon ${
                        isLiked ? "liked" : "like"
                    } pointer text-lg`}
                >
                    {isLoading ? (
                        <Spin />
                    ) : (
                        <HeartFilled onClick={() => updateWishlist()} />
                    )}
                </div>
            </div>
        </Container>
    );
};

type Props = {
    id: number;
    name: string;
    image: string;
    price: number;
    liked: boolean;
    platforms: PlatformKey[];
    rating: number;
    onLike?: (id: number) => void;
};

export default ProductCard;
