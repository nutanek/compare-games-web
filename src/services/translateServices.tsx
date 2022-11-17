import en from "./../constants/i18n/en.json";
import th from "./../constants/i18n/th.json";

type LangSlug = "en" | "th";

export const langSlug: LangSlug =
    (localStorage.getItem("lang_slug") as LangSlug) || "en";

export function T(key: string, params?: any): string {
    params = params || {};
    return translate(langSlug, key, params);
}

function translate(langSlug: LangSlug, key: string, params: any): string {
    let translatedText =
        langSlug === "en"
            ? en[key as keyof typeof en]
            : th[key as keyof typeof th];
    if (translatedText && params) {
        translatedText = replaceParams(translatedText, params);
    }
    return translatedText || key;
}

function replaceParams(text: string, params: any): string {
    Object.keys(params).forEach((key) => {
        let regExp = new RegExp(`({{${key}}})`, "ig");
        text = text.replace(regExp, params[key]);
    });
    return text;
}
