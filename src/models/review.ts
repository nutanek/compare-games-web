export type ReviewsByPage = {
    reviews: ReviewItem[];
    page: number;
    total: number;
};

export type ReviewItem = {
    id: number;
    rating: number;
    comment: string;
    created_time: number;
    like_count: number;
    dislike_count: number;
    display_name: string;
    image: string;
    liked: boolean;
    disliked: boolean;
};
