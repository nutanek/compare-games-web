import { useRef } from "react";
import styled from "styled-components";
import numeral from "numeral";
import LazyLoad from "react-lazyload";

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
    }
    .price {
        color: #fe0707;
    }
`;

const ProductCard = ({ id, name, image, price }: Props) => {
    const refImage = useRef<HTMLImageElement>(null);

    const removePlaceholder = () => {
        const node = refImage.current;
        node?.classList.add("fade-in-image");
        node?.classList.remove("opacity-0");
    };

    return (
        <Container>
            <div className="image-wrapper">
                <LazyLoad>
                    <img
                        ref={refImage}
                        className="image opacity-0"
                        onLoad={removePlaceholder}
                        onError={removePlaceholder}
                        src={image}
                        alt={name}
                    />
                </LazyLoad>
            </div>
            <div className="name text-sm text-bold text-ellipsis-2">{name}</div>
            <div className="price text-sm text-bold">
                THB {numeral(price).format("0,0.00")}
            </div>
        </Container>
    );
};

type Props = {
    id: number;
    name: string;
    image: string;
    price: number;
};

export default ProductCard;
