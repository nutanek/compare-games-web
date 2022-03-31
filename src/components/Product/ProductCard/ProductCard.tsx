import styled from "styled-components";
import numeral from 'numeral'

const Container = styled.div`
    .image-wrapper {
        position: relative;
        overflow: hidden;
        height: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 8px;
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
        padding: 15px 0;
    }
    .price {
        color: #fe0707;
    }
`;

const ProductCard = ({ id, name, image, price }: Props) => {
    return (
        <Container>
            <div className="image-wrapper">
                <img className="image" src={image} alt={name} />
            </div>
            <div className="name text-sm text-bold">{name}</div>
            <div className="price text-sm text-bold">
                THB{" "}
                {numeral(price).format('0,0.00')}
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
