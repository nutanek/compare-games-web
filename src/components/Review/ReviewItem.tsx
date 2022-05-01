import styled from "styled-components";
import { Rate } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { ReviewItem as ReviewItemModel } from "../../models/review";
import { epochToDateTime } from "../../services/appServices";

const Container = styled.div`
    border: 1px solid #d2d4d9;
    padding: 15px;
    margin-bottom: 15px;
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
            .review-time {
                color: #808080;
            }
        }
        > .rating-star {
        }
    }
    > .comment {
        padding-top: 30px;
    }
    > .reactions {
        margin-top: 30px;
        display: flex;
        gap: 15px;
        .reaction {
            &-like {
                color: #02439c;
                .icon {
                }
            }
            &-dislike {
                color: #e60811;
                .icon {
                }
            }
        }
    }
`;

const ReviewItem = (props: Props) => {
    const { review } = props;
    return (
        <Container>
            <div className="profile">
                <div className="avatar-wrapper">
                    <div
                        className="avatar"
                        style={{ backgroundImage: `url(${review.image})` }}
                    ></div>
                </div>
                <div className="name">
                    <div className="display-name text-bold text-md">
                        {review.display_name}
                    </div>
                    <div className="review-time text-sm">
                        {epochToDateTime(
                            review.created_time,
                            "mmm d, yyyy HH:MM"
                        )}
                    </div>
                </div>
                <div className="rating-star">
                    <Rate disabled value={review.rating} />
                </div>
            </div>
            {review.comment !== "" && (
                <div className="comment text-md">{review.comment}</div>
            )}
            <div className="reactions">
                <div
                    className="reaction reaction-like text-sm pointer"
                    onClick={() =>
                        props.onReact(review.liked ? "unlike" : "like")
                    }
                >
                    <span className="icon">
                        <LikeFilled />
                    </span>{" "}
                    <span className="text">
                        {review.like_count > 0 ? review.like_count + " " : ""}
                        {review.like_count > 1 ? "Likes" : "Like"}{" "}
                        {review.liked && " by you"}
                    </span>
                </div>
                <div
                    className="reaction reaction-dislike text-sm pointer"
                    onClick={() =>
                        props.onReact(review.disliked ? "undislike" : "dislike")
                    }
                >
                    <span className="icon">
                        <DislikeFilled />
                    </span>{" "}
                    <span className="text">
                        {review.dislike_count > 0
                            ? review.dislike_count + " "
                            : ""}
                        {review.dislike_count > 1 ? "Dislikes" : "Dislike"}{" "}
                        {review.disliked && " by you"}
                    </span>
                </div>
            </div>
        </Container>
    );
};

type Props = {
    review: ReviewItemModel;
    onReact: (reactionType: string) => void;
};

export default ReviewItem;
