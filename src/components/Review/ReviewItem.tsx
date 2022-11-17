import styled from "styled-components";
import { Rate } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import moment from "moment";
import { ReviewItem as ReviewItemModel } from "../../models/review";
import {
    ROOT_PATH,
    IMAGE_PATH,
    APP_DATE_FORMAT,
} from "../../constants/appConstants";
import { T, langSlug } from "../../services/translateServices";

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
        white-space: pre-line;
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
                        style={{
                            backgroundImage: `url(${
                                review.image
                                    ? `${IMAGE_PATH}/users/${review.image}`
                                    : `${ROOT_PATH}/images/no-avatar.png`
                            })`,
                        }}
                    ></div>
                </div>
                <div className="name">
                    <div className="display-name text-bold text-md">
                        {review.display_name}
                    </div>
                    <div className="review-time text-sm">
                        {moment
                            .unix(review.created_time / 1000)
                            .format(`${APP_DATE_FORMAT} HH:mm`)}
                    </div>
                </div>
                <div className="rating-star">
                    <Rate disabled allowHalf value={review.rating} />
                </div>
            </div>
            {review.comment !== "" && (
                <div
                    className="comment text-md"
                    dangerouslySetInnerHTML={{ __html: review.comment }}
                />
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
                        {review.like_count > 1 ? T("LIKES") : T("LIKE")}{" "}
                        {review.liked && ` ${T("BY_YOU")}`}
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
                        {review.dislike_count > 1
                            ? T("DISLIKES")
                            : T("DISLIKE")}{" "}
                        {review.disliked && ` ${T("BY_YOU")}`}
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
