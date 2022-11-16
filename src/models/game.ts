import { Filter } from "./filter";
import { AGE_RATINGS } from "./../constants/appConstants";

export type Game = {
    id: number;
    name: string;
    image: string;
    price: number;
    liked: boolean;
    rating: number;
    platforms: PlatformKey[];
};

export type Home = {
    on_sales: Game[];
    most_populars: Game[];
    new_releases: Game[];
    comming_soons: Game[];
};

export type GamesWithFilter = {
    title: string;
    page: number;
    items_per_page: number;
    total: number;
    sorting_id: number;
    filter: Filter[];
    games: Game[];
};

export type PlatformKey = "ps" | "xbox" | "nintendo";

export type SingleGamePrice = {
    platform: PlatformKey;
    is_on_platform: boolean;
    original_price: number;
    sale_price: number;
    final_price: number;
    shop_url: string;
};

export type SingleGameGenre = {
    id: number;
    slug: string;
    name: string;
};

export type SingleGame = {
    id: number;
    name: string;
    image: string;
    detail: string;
    release_date: number;
    age_rating: keyof typeof AGE_RATINGS | null;
    developer: string;
    voices: string;
    subtitles: string;
    metacritic_rating: number;
    metacritic_rating_count: number;
    metacritic_ref_url: string;
    user_rating: number;
    user_rating_count: number;
    liked: boolean;
    prices: SingleGamePrice[];
    genres: SingleGameGenre[];
};

export type GameAdmin = {
    id: number;
    name: string;
    image: string;
    detail: string;
    release_date: number;
    age_rating: keyof typeof AGE_RATINGS | "";
    developer: string;
    voices: string[];
    subtitles: string[];
    metacritic_rating: number;
    metacritic_rating_count: number;
    metacritic_ref_url: string;
    user_rating: number;
    user_rating_count: number;
    original_price_ps: number;
    sale_price_ps: number;
    original_price_xbox: number;
    sale_price_xbox: number;
    original_price_nintendo: number;
    sale_price_nintendo: number;
    ps_shop_url: string;
    xbox_shop_url: string;
    nintendo_shop_url: string;
    in_platform_ps: boolean;
    in_platform_xbox: boolean;
    in_platform_nintendo: boolean;
    genres: SingleGameGenre[];
};
