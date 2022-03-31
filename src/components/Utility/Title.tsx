import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
`;

const Title = ({ title, seeAllText, seeAllLink }: Props) => {
    return (
        <Container className="text-3xl text-bold">
            <div className="title">{title}</div>
            {seeAllText && (
                <Link to={seeAllLink || ""} className="see-all">
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
