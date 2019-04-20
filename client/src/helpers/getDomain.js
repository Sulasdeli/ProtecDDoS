import {isProduction} from "./isProduction";

export const getDomain = () => {
    const prodUrl = "";
    const devUrl = "http://localhost:5000";
    if (isProduction()) {
        return prodUrl;
    }
    return devUrl;
};