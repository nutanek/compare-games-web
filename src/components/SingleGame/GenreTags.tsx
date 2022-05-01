import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROOT_PATH } from "../../constants/appConstants";
import { SingleGameGenre } from "../../models/game";

const Container = styled.div`
    display: flex;
    gap: 5px;
    .tag {
        padding: 2px 8px;
        background-color: var(--main-app-color);
        color: #ffffff;
        border-radius: 100px;
    }
`;

const GenreTags = (props: Props) => {
    return (
        <Container>
            {props.genres.map((genre) => (
                <Link key={genre.id} to={`${ROOT_PATH}/games?game-type=${genre.slug}`}>
                    <div className="tag text-sm">{genre.name}</div>
                </Link>
            ))}
        </Container>
    );
};

type Props = {
    genres: SingleGameGenre[];
};

export default GenreTags;
