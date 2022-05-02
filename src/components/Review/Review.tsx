import React from "react";
import { message, Pagination, Spin, Empty } from "antd";
import { Component } from "react";
import clone from "lodash/clone";
import styled from "styled-components";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { ReviewItem as ReviewItemModel } from "../../models/review";
import { getReviewsApi, reactReviewApi } from "./../../services/apiServices";
import { isLoggedIn as checkIsLoggedIn } from "./../../services/appServices";
import ReviewItem from "./ReviewItem";
import CommentBox from "./CommentBox";

const Container = styled.div``;

class Review extends Component<Props> {
    state: State = {
        isLoading: false,
        reviews: [],
        currentPage: 1,
        total: 0,
    };

    topOfReviewRef = React.createRef<HTMLDivElement>();

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

    onChangePage(page: number) {
        this.setState({ currentPage: page }, () => this.getReviews());
        this.topOfReviewRef?.current?.scrollIntoView({ block: "center" });
    }

    onSuccessReview() {
        this.props.onSuccessReview && this.props.onSuccessReview();
        this.topOfReviewRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }

    render() {
        const isLoggedIn = checkIsLoggedIn();
        return (
            <Spin tip="Loading..." spinning={this.state.isLoading}>
                <div ref={this.topOfReviewRef}></div>
                {this.state.reviews.map((review, index) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onReact={(reactionType) =>
                            this.reactReview(index, reactionType)
                        }
                    />
                ))}
                {!this.state.isLoading && this.state.reviews.length === 0 && (
                    <Empty description="No reviews" />
                )}
                <Pagination
                    style={{ textAlign: "right" }}
                    current={this.state.currentPage}
                    pageSize={5}
                    total={this.state.total}
                    hideOnSinglePage={true}
                    showSizeChanger={false}
                    onChange={this.onChangePage.bind(this)}
                />
                {isLoggedIn ? (
                    <CommentBox
                        gameId={this.props.gameId}
                        onSuccess={() => this.onSuccessReview()}
                    />
                ) : null}
            </Spin>
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
    onSuccessReview?: () => void;
};

export default Review;
