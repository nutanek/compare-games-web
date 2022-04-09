import axios, { AxiosResponse } from "axios";
import { Home, GamesWithFilter, Game } from "./../models/game";
import { Wishlist } from "../models/wishlist";
import { SignUp, SignIn } from "./../models/user";
import { getLocalAccessToken, signout } from "./appServices";

const API_URL = process.env.REACT_APP_API_URL || "";

const PATH = {
    signup: `${API_URL}/signup`,
    signin: `${API_URL}/signin`,
    home: `${API_URL}/home`,
    allGames: `${API_URL}/all-games`,
    searchGames: `${API_URL}/search/games`,
    wishlist: `${API_URL}/wishlist`,
    chat: `${API_URL}/chat`,
};

export function getHomeApi(): Promise<AxiosResponse<Home, any>> {
    return axios.get<Home>(PATH.home);
}

export function getAllGamesApi(
    params: object
): Promise<AxiosResponse<GamesWithFilter, any>> {
    const data = JSON.stringify(params);
    return axios.post<GamesWithFilter>(PATH.allGames, data);
}

export function signupApi(params: object): Promise<AxiosResponse<SignUp, any>> {
    const data = JSON.stringify(params);
    return axios.post<SignUp>(PATH.signup, data);
}

export function signinApi(params: object): Promise<AxiosResponse<SignIn, any>> {
    const data = JSON.stringify(params);
    return axios.post<SignIn>(PATH.signin, data);
}

export function searchGamesApi(params: {
    keyword: string;
}): Promise<AxiosResponse<Game[], any>> {
    return axios.get<Game[]>(PATH.searchGames + `?keyword=${params.keyword}`);
}

export function getWishlistApi(params: {
    page: number;
}): Promise<AxiosResponse<Wishlist, any>> {
    return axios.get<Wishlist>(PATH.wishlist + `?page=${params.page}`);
}

export function updateWishlistApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.wishlist, params);
}

export function chatApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.chat, params);
}

axios.interceptors.request.use(async (config) => {
    const accessToken = getLocalAccessToken();
    config.headers = {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
    };
    return config;
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 401) {
            signout({ isCallback: true });
        }
        return Promise.reject(error);
    }
);
