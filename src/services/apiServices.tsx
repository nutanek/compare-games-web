import axios, { AxiosResponse } from "axios";
import { Home, GamesWithFilter } from "./../models/game";
import { SignUp, SignIn } from "./../models/user";
import { getLocalAccessToken, signout } from "./appServices";

const API_URL = process.env.REACT_APP_API_URL || "";

const PATH = {
    signup: `${API_URL}/signup`,
    signin: `${API_URL}/signin`,
    home: `${API_URL}/home`,
    allGames: `${API_URL}/all-games`,
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
