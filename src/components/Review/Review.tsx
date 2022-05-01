import { Row, Col, message } from "antd";
import { Component } from "react";
import clone from "lodash/clone";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { ReviewItem as ReviewItemModel } from "../../models/review";
import { getReviewsApi, reactReviewApi } from "./../../services/apiServices";
import LoadingModal from "../Utility/Modal/Loading";
import ReviewItem from "./ReviewItem";

const Container = styled.div``;

class Review extends Component<Props> {
    state: State = {
        isLoading: false,
        reviews: [],
        currentPage: 1,
        total: 0,
    };

    componentDidMount() {
        this.getReviews();
    }

    async getReviews() {
        try {
            this.setState({ isLoading: true });
            let { data } = await getReviewsApi({
                gameId: this.props.gameId,
                page: this.state.currentPage,
            });
            this.setState({
                isLoading: false,
                reviews: data.reviews,
                total: data.total,
            });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            message.error(ERRORS.unknown);
        }
    }

    async reactReview(reviewIndex: number, reactionType: string) {
        try {
            this.setState({ isLoading: true });
            let reviews = clone(this.state.reviews);
            let review = reviews[reviewIndex];
            await reactReviewApi({
                review_id: review.id,
                reaction_type: reactionType,
            });

            if (reactionType === "like") {
                reviews[reviewIndex] = {
                    ...reviews[reviewIndex],
                    liked: true,
                    like_count: review.like_count + 1,
                };
                if (review.disliked) {
                    reviews[reviewIndex] = {
                        ...reviews[reviewIndex],
                        disliked: false,
                        dislike_count: review.dislike_count - 1,
                    };
                }
            } else if (reactionType === "dislike") {
                reviews[reviewIndex] = {
                    ...reviews[reviewIndex],
                    disliked: true,
                    dislike_count: review.dislike_count + 1,
                };
                if (review.liked) {
                    reviews[reviewIndex] = {
                        ...reviews[reviewIndex],
                        liked: false,
                        like_count: review.like_count - 1,
                    };
                }
            } else if (reactionType === "unlike") {
                reviews[reviewIndex] = {
                    ...reviews[reviewIndex],
                    liked: false,
                    like_count: review.like_count - 1,
                };
            } else if (reactionType === "undislike") {
                reviews[reviewIndex] = {
                    ...reviews[reviewIndex],
                    disliked: false,
                    dislike_count: review.dislike_count - 1,
                };
            }

            this.setState({
                isLoading: false,
                reviews,
            });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            message.error(ERRORS.unknown);
        }
    }

    render() {
        return (
            <>
                {this.state.reviews.map((review, index) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onReact={(reactionType) =>
                            this.reactReview(index, reactionType)
                        }
                    />
                ))}
                <LoadingModal isOpen={this.state.isLoading} />
            </>
        );
    }
}

type State = {
    isLoading: boolean;
    reviews: ReviewItemModel[];
    currentPage: number;
    total: number;
};

type Props = {
    gameId: number;
};

export default Review;
