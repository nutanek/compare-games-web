import styled from "styled-components";
import { PlatformKey } from "./../../../models/game";

const Container = styled.div`
padding-top: 10px;
    display: flex;
    gap: 5px;
    > .platform-item {
        color: #ffffff;
        border-radius: 8px;
        padding: 2px 8px;
        font-size: 11px;
        &.ps {
            background-color: #00439c;
        }
        &.xbox {
            background-color: #008746;
        }
        &.nintendo {
            background-color: #E60012;
        }
    }
`;

const PLATFOTM = {
    ps: "PS",
    xbox: "Xbox",
    nintendo: "Nintendo",
};

const PlatformTags = ({ platforms }: Props) => {
    return (
        <Container>
            {platforms.map((platform) => (
                <div
                    key={platform}
                    className={`platform-item ${platform || ""}`}
                >
                    {PLATFOTM[platform] || ""}
                </div>
            ))}
        </Container>
    );
};

type Props = {
    platforms: PlatformKey[];
};

export default PlatformTags;