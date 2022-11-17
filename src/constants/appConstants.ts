export const ROOT_PATH = process.env.REACT_APP_ROOT_PATH;

export const API_URL = process.env.REACT_APP_API_URL || "";
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "";
export const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH || "";

export const KEY_ACCESS_TOKEN = "consoles_access_token";
export const KEY_USER_INFO = "consoles_user_info";

export const APP_DATE_FORMAT = "MMM D, YYYY";

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
        nameTh: "วันที่วางจำหน่าย",
    },
    {
        id: SORTING_ID.priceLowToHigh,
        name: "Price (Low to Hight)",
        nameTh: "ราคา (ต่ำไปสูง)",
    },
    {
        id: SORTING_ID.priceHighToLow,
        name: "Price (Hight to Low)",
        nameTh: "ราคา (สูงไปต่ำ)",
    },
    {
        id: SORTING_ID.nameAToZ,
        name: "Name A-Z",
        nameTh: "ชื่อ A-Z",
    },
    {
        id: SORTING_ID.rating,
        name: "Metacritic Score",
        nameTh: "คะแนนจากนักวิจารณ์",
    },
];

export const ERRORS = {
    unknown: "Something went wrong!",
};

export const USER_GENDER = {
    m: {
        name: "Male",
        nameTh: "ชาย",
    },
    f: {
        name: "Female",
        nameTh: "หญิง",
    },

    n: {
        name: "Choose not to answer",
        nameTh: "ไม่ระบุ",
    },
};

export const USER_ROLE = {
    admin: "admin",
    user: "user",
};

export const AGE_RATINGS = {
    "IARC_3+": "3+",
    "IARC_7+": "7+",
    "IARC_12+": "12+",
    "IARC_16+": "16+",
    "IARC_18+": "18+",
};
