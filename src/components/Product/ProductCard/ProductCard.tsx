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
import PlatformTags from "./PlatformTags";

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
`;

const ProductCard = ({
    id,
    name,
    image,
    price,
    liked,
    platforms,
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
            message.success(data?.msg || "Success!");
        } catch (error: any) {
            setIsLoading(false);
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
    }

    return (
        <Container>
            <Link to={`${ROOT_PATH}/game/${id}`}>
                <div className="image-wrapper">
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
            <div className="name text-sm text-bold text-ellipsis-2">{name}</div>
            <div className="price-wrapper">
                <div className="price text-sm text-bold">
                    THB {numeral(price).format("0,0.00")}
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
    onLike?: (id: number) => void;
};

export default ProductCard;
