import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
`;

const Title = ({ title, seeAllText, seeAllLink }: Props) => {
    return (
        <Container>
            <div className="title text-3xl text-bold">{title}</div>
            {seeAllText && (
                <Link to={seeAllLink || ""} className="see-all text-md">
                    {seeAllText}
                </Link>
            )}
        </Container>
    );
};

type Props = {
    title: string;
    seeAllText?: string;
    seeAllLink?: string;
};

export default Title;
