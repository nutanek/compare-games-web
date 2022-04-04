import axios, { AxiosResponse } from "axios";
import { Home, GamesWithFilter } from "./../models/game";

const API_URL = process.env.REACT_APP_API_URL || "";
const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY || "";

const PATH = {
    signup: `${API_URL}/signup`,
    home: `${API_URL}/home`,
    allGames: `${API_URL}/all-games`,
};

export function getHomeApi(): Promise<AxiosResponse<Home, any>> {
    return axios.get<Home>(PATH.home);
}

export function getAllGamesApi(params: object): Promise<AxiosResponse<GamesWithFilter, any>> {
    const data = JSON.stringify(params);
    return axios.post<GamesWithFilter>(PATH.allGames, data);
}

export function signupApi(params: object): Promise<AxiosResponse<any, any>> {
    const data = JSON.stringify(params);
    return axios.post<any>(PATH.signup, data);
}

axios.interceptors.request.use(async (config) => {
    config.headers = {
        "x-access-token": API_PUBLIC_KEY,
        "Content-Type": "application/json",
    };
    return config;
});
