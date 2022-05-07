export const ROOT_PATH = "/compare-game";

export const API_URL = process.env.REACT_APP_API_URL || "";
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "";
export const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH || "";

export const KEY_ACCESS_TOKEN = "consoles_access_token";
export const KEY_USER_INFO = "consoles_user_info";

export const SORTINGS = [
    {
        id: 1,
        name: "New Release",
    },
    {
        id: 2,
        name: "Price (Low to Hight)",
    },
    {
        id: 3,
        name: "Price (Hight to Low)",
    },
    {
        id: 4,
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
