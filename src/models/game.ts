export type Game = {
    id: number;
    name: string;
    image: string;
    price: number;
};

export type Home = {
    onSales: Game[];
    mostPopulars: Game[];
    newReleases: Game[];
    commingSoons: Game[];
};
