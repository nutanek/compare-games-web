import { Game } from "./game";

export type Wishlist = {
    page: number;
    total: number;
    games: Game[];
};
