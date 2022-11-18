export type SignUp = {
    user_id: number;
    display_name: string;
    email: string;
    image: string;
    role: 'user' | 'admin';
    access_token: string;
};

export type SignIn = SignUp;

export type UserInfo = {
    id: number;
    email: string;
    display_name: string;
    image: string;
    gender: UserGender;
    country: string;
    role: string;
};

export type UserGender = "m" | "f" | "n" | '';
