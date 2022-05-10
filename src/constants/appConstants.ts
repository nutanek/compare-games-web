export const ROOT_PATH = "/compare-game";

export const API_URL = process.env.REACT_APP_API_URL || "";
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "";
export const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH || "";

export const KEY_ACCESS_TOKEN = "consoles_access_token";
export const KEY_USER_INFO = "consoles_user_info";

export const APP_DATE_FORMAT = "MMM DD, YYYY";

export const SORTING_ID = {
    releaseDate: 1,
    priceLowToHigh: 2,
    priceHighToLow: 3,
    nameAToZ: 4,
    rating: 5,
    createdDate: 6,
};

export const SORTINGS = [
    {
        id: SORTING_ID.releaseDate,
        name: "Release date",
    },
    {
        id: SORTING_ID.priceLowToHigh,
        name: "Price (Low to Hight)",
    },
    {
        id: SORTING_ID.priceHighToLow,
        name: "Price (Hight to Low)",
    },
    {
        id: SORTING_ID.nameAToZ,
        name: "Name A-Z",
    },
    {
        id: SORTING_ID.rating,
        name: "Rating",
    },
];

export const ERRORS = {
    unknown: "Something went wrong!",
};

export const USER_GENDER = {
    m: "Male",
    f: "Female",
    n: "Choose not to answer",
};

export const USER_ROLE = {
    admin: "admin",
    user: "user",
};
