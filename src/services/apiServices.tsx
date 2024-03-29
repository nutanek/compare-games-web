import axios, { AxiosResponse } from "axios";
import {
    Home,
    GamesWithFilter,
    Game,
    SingleGame,
    GameAdmin,
    SingleGameGenre,
} from "./../models/game";
import { ReviewsByPage } from "./../models/review";
import { Wishlist } from "../models/wishlist";
import { SignUp, SignIn, UserInfo } from "./../models/user";
import { AllChatRooms } from "./../models/chat";
import { UploadImage } from "../models/upload";
import { getLocalAccessToken, signout } from "./appServices";
import { API_URL } from "../constants/appConstants";

const PATH = {
    signup: `${API_URL}/signup`,
    signin: `${API_URL}/signin`,
    forgotPassword: `${API_URL}/forgot-password`,
    resetPassword: `${API_URL}/reset-password`,
    userSelf: `${API_URL}/user/self`,
    userPassword: `${API_URL}/user/password`,
    home: `${API_URL}/home`,
    game: `${API_URL}/game`,
    allGames: `${API_URL}/all-games`,
    searchGames: `${API_URL}/search/games`,
    wishlist: `${API_URL}/wishlist`,
    chatRooms: `${API_URL}/chat-rooms`,
    chat: `${API_URL}/chat`,
    reviews: `${API_URL}/reviews`,
    reactReview: `${API_URL}/react-review`,
    review: `${API_URL}/review`,
    gameAdmin: `${API_URL}/admin/game`,
    allGameGenresAdmin: `${API_URL}/admin/all-game-genres`,
    gameFromUrlAdmin: `${API_URL}/admin/game-url`,
    uploadImage: `${API_URL}/upload-image`,
};

export function getHomeApi(): Promise<AxiosResponse<Home, any>> {
    return axios.get<Home>(PATH.home);
}

export function getGameApi(params: {
    id: number;
}): Promise<AxiosResponse<SingleGame, any>> {
    return axios.get<SingleGame>(PATH.game + `?id=${params.id}`);
}

export function getAllGameGenresAdminApi(): Promise<
    AxiosResponse<SingleGameGenre[], any>
> {
    return axios.get<SingleGameGenre[]>(PATH.allGameGenresAdmin);
}

export function getGameAdminApi(params: {
    id: number;
}): Promise<AxiosResponse<GameAdmin, any>> {
    return axios.get<GameAdmin>(PATH.gameAdmin + `?id=${params.id}`);
}

export function addGameAdminApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.gameAdmin, params);
}

export function updateGameAdminApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.put<any>(PATH.gameAdmin, params);
}

export function removeGameAdminApi(params: {
    id: number;
}): Promise<AxiosResponse<any, any>> {
    return axios.delete<any>(PATH.gameAdmin + `?id=${params.id}`);
}

export function addGameFromUrlAdminApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.gameFromUrlAdmin, params);
}

export function getAllGamesApi(
    params: object
): Promise<AxiosResponse<GamesWithFilter, any>> {
    const data = JSON.stringify(params);
    return axios.post<GamesWithFilter>(PATH.allGames, data);
}

export function getReviewsApi(params: {
    gameId: number;
    page: number;
}): Promise<AxiosResponse<ReviewsByPage, any>> {
    return axios.get<ReviewsByPage>(
        PATH.reviews + `?game_id=${params.gameId}&page=${params.page}`
    );
}

export function reactReviewApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.reactReview, params);
}

export function addReviewApi(params: object): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.review, params);
}

export function signupApi(params: object): Promise<AxiosResponse<SignUp, any>> {
    const data = JSON.stringify(params);
    return axios.post<SignUp>(PATH.signup, data);
}

export function signinApi(params: object): Promise<AxiosResponse<SignIn, any>> {
    const data = JSON.stringify(params);
    return axios.post<SignIn>(PATH.signin, data);
}

export function forgotPasswordApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.forgotPassword, params);
}

export function resetPassword(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.resetPassword, params);
}

export function getUserSelfApi(): Promise<AxiosResponse<UserInfo, any>> {
    return axios.get<UserInfo>(PATH.userSelf);
}

export function updateUserSelfApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.put<any>(PATH.userSelf, params);
}

export function updateUserPasswordApi(
    params: object
): Promise<AxiosResponse<any, any>> {
    return axios.put<any>(PATH.userPassword, params);
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

export function getChatRoomApi(
    params: object
): Promise<AxiosResponse<AllChatRooms, any>> {
    return axios.post<AllChatRooms>(PATH.chatRooms, params);
}

export function chatApi(params: object): Promise<AxiosResponse<any, any>> {
    return axios.post<any>(PATH.chat, params);
}

export function uploadImageApi(
    params: object
): Promise<AxiosResponse<UploadImage, any>> {
    return axios.post<UploadImage>(PATH.uploadImage, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

axios.interceptors.request.use(async (config) => {
    const accessToken = getLocalAccessToken();
    config.headers = {
        ...config.headers,
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
