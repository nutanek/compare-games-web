import { Filter } from "./filter";

export type Game = {
    id: number;
    name: string;
    image: string;
    price: number;
    liked: boolean 
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
    items_per_page: number,
    total: number;
    sorting_id: number;
    filter: Filter[];
    games: Game[];
};
