import styled from "styled-components";
import { getPasswordStrengthScore } from "./../../services/appServices";

const Container = styled.div`
    display: flex;
    gap: 5px;
    .item {
        height: 3px;
        border-radius: 10px;
        flex: 1;
        background-color: #eeeeee;
        &-1 {
            background-color: #ff4d4f;
        }
        &-2 {
            background-color: #ffa940;
        }
        &-3 {
            background-color: #fadb14;
        }
        &-4 {
            background-color: #73d13d;
        }
    }
`;

const PasswordStrengthScore = ({ password }: Props) => {
    let score = getPasswordStrengthScore(password);

    return (
        <Container>
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className={`item item-${item <= score ? score : 0}`}
                ></div>
            ))}
        </Container>
    );
};

type Props = {
    password: string;
};

export default PasswordStrengthScore;
