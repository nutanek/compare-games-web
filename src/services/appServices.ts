import dateFormat from "dateformat";
import { SignUp } from "../models/user";
import {
    KEY_ACCESS_TOKEN,
    KEY_USER_INFO,
    ROOT_PATH,
} from "./../constants/appConstants";

export function getPasswordStrengthScore(password: string): number {
    let score = 0;
    if (password.match(/[a-z]+/)) {
        score += 1;
    }
    if (password.match(/[A-Z]+/)) {
        score += 1;
    }
    if (password.match(/[0-9]+/)) {
        score += 1;
    }
    if (password.match(/[^A-Za-z0-9]+/)) {
        score += 1;
    }
    if (password.length > 0 && password.length < 8) {
        score = 1;
    }
    return score;
}

export function getLocalAccessToken(): string {
    const token =
        localStorage.getItem(KEY_ACCESS_TOKEN) ||
        process.env.REACT_APP_API_PUBLIC_KEY ||
        "";
    return token;
}

export function setLocalAccessToken(token: string): void {
    localStorage.setItem(KEY_ACCESS_TOKEN, token);
}

export function getLocalUserInfo(): SignUp {
    const userInfoStr = localStorage.getItem(KEY_USER_INFO) || "{}";
    try {
        let userInfo: SignUp = JSON.parse(userInfoStr);
        return userInfo;
    } catch (error) {
        return {} as SignUp;
    }
}

export function setLocalUserInfo(data: SignUp): void {
    let jsonStr = JSON.stringify(data);
    localStorage.setItem(KEY_USER_INFO, jsonStr);
}

export function clearAuth(): void {
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    localStorage.removeItem(KEY_USER_INFO);
}

export function signout({ isCallback }: { isCallback: boolean | undefined }) {
    clearAuth();
    if (isCallback) {
        let callbackUrl = encodeURIComponent(window.location.href);
        window.location.replace(`${ROOT_PATH}/login?callback=${callbackUrl}`);
    } else {
        window.location.reload();
    }
}

export function isLoggedIn(): boolean {
    let accessToken = getLocalAccessToken();
    let userInfo = getLocalUserInfo();
    if (userInfo.user_id && userInfo.access_token == accessToken) {
        return true;
    }
    return false;
}

export function getUserRole(): string {
    let userInfo = getLocalUserInfo();
    return userInfo.role;
}

export function epochToDateTime(epoch: number, format: string): string {
    var d = new Date();
    let date = new Date(epoch + d.getTimezoneOffset());
    let timeFormat = dateFormat(date, format);
    return timeFormat;
}
