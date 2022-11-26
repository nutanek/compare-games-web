import { Row, Col } from "antd";
import styled from "styled-components";
import stickers from "./../../constants/stickers.json";
import { ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div`
    height: 240px;
    overflow-y: auto;
    padding: 20px;
    background-color: #eeeeee;
    .sticker-item {
        cursor: pointer;
        &:hover {
            > img {
                transform: scale(1.2);
            }
        }
    }
`;

const StickerSelector = (props: Props) => {
    return (
        <Container>
            <Row gutter={[30, 20]}>
                {stickers.map((sticker) => (
                    <Col
                        key={sticker.id}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={4}
                        className="sticker-item"
                        onClick={() => props.onSelect(sticker.id)}
                    >
                        <img
                            style={{ width: "100%" }}
                            src={`${ROOT_PATH}/images/stickers/${sticker.id}.png`}
                            title={sticker.name}
                            alt={sticker.name}
                        />
                    </Col>
                ))}
                <Col span={24} className="text-center text-xs">
                    <a
                        href="https://www.flaticon.com/stickers-pack/cute-axolotl"
                        title="happy stickers"
                        target="_blank"
                    >
                        Cute Axolotl stickers pack - Flaticon
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

type Props = {
    onSelect: (id: string) => void;
};

export default StickerSelector;
