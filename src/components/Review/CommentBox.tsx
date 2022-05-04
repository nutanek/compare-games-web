import { Component } from "react";
import { Button, Input, message, Rate, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ERRORS } from "../../constants/appConstants";
import { addReviewApi } from "./../../services/apiServices";
import { getLocalUserInfo } from "./../../services/appServices";

const { TextArea } = Input;

const Container = styled.div`
    margin-top: 30px;
    > .title {
        margin-bottom: 20px;
    }
    > .profile {
        display: flex;
        gap: 15px;
        > .avatar-wrapper {
            > .avatar {
                width: 50px;
                height: 50px;
                background-color: #ddd;
                background-size: cover;
                background-position: center;
                border-radius: 100%;
            }
        }
        > .name {
            flex: 1;
            display: flex;
            align-items: center;
            .review-time {
                color: #808080;
            }
        }
    }
    > .review-rating {
        margin: 20px 0;
    }
    > .review-comment {
        text-align: right;
        textarea {
            margin-bottom: 15px;
        }
    }
`;

class CommentBox extends Component<Props> {
    state: State = {
        isLoading: false,
        rating: 0,
        comment: "",
    };

    async addReview() {
        try {
            this.setState({ isLoading: true });
            await addReviewApi({
                game_id: this.props.gameId,
                rating: this.state.rating,
                comment: this.state.comment,
            });
            message.success('Thank you for your review!');
            this.setState({
                isLoading: false,
                rating: 0,
                comment: "",
            });
            this.props.onSuccess && this.props.onSuccess();
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            message.error(ERRORS.unknown);
        }
    }

    onChangeRating(rating: number) {
        this.setState({ rating });
    }

    onChangeComment(comment: string) {
        this.setState({ comment });
    }

    render() {
        let user = getLocalUserInfo();
        return (
            <Spin tip="Loading..." spinning={this.state.isLoading}>
                <Container>
                    <h2 className="title text-bold text-lg">Review the game</h2>
                    <div className="profile">
                        <div className="avatar-wrapper">
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${user.image})`,
                                }}
                            ></div>
                        </div>
                        <div className="name">
                            <div className="display-name text-bold text-md">
                                {user.display_name}
                            </div>
                        </div>
                    </div>
                    <div className="review-rating">
                        <Rate
                            value={this.state.rating}
                            style={{ fontSize: 26 }}
                            onChange={this.onChangeRating.bind(this)}
                        />
                    </div>
                    <div className="review-comment">
                        <TextArea
                            rows={4}
                            placeholder="What do you think about the game?"
                            value={this.state.comment}
                            onChange={(e) =>
                                this.onChangeComment(e.target.value)
                            }
                        ></TextArea>
                        <Button
                            disabled={this.state.rating === 0}
                            type="primary"
                            style={{ borderRadius: 8 }}
                            icon={<SendOutlined />}
                            size="large"
                            onClick={() => this.addReview()}
                        >
                            Submit
                        </Button>
                    </div>

                    {/* <LoadingModal isOpen={this.state.isLoading} /> */}
                </Container>
            </Spin>
        );
    }
}

type State = {
    isLoading: boolean;
    rating: number;
    comment: string;
};

type Props = {
    gameId: number;
    onSuccess?: () => void;
};

export default CommentBox;
