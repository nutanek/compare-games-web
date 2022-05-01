import { Filter } from "./filter";

export type Game = {
    id: number;
    name: string;
    image: string;
    price: number;
    liked: boolean;
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
    platform: PlatformKey
    is_on_platform: boolean
    original_price: number
    sale_price: number
    final_price: number
}

export type SingleGameGenre = {
    id: number
    slug: string
    name: string
}

export type SingleGame = {
    id: number,
    name: string
    image: string
    detail: string
    release_date: number
    developer: string
    voices: string
    subtitles: string
    metacritic_rating: number
    metacritic_rating_count: number
    user_rating: number
    user_rating_count: number,
    liked: boolean,
    prices: SingleGamePrice[]
    genres: SingleGameGenre[]
}