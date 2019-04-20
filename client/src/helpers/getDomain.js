import {isProduction} from "./isProduction";

export const getDomain = () => {
    const prodUrl = "";
    const devUrl = "http://localhost:8080";
    if (isProduction()) {
        return prodUrl;
    }
    return devUrl;
};