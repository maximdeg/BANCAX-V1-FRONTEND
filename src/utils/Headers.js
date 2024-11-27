import ENV from "../env.js";

export const getUnnauthenticatedHeaders = () => {
    const unnauthenticatedHeaders = new Headers();
    unnauthenticatedHeaders.set("Content-Type", "application/json");
    unnauthenticatedHeaders.set("x-api-key", ENV.API_KEY);
    return unnauthenticatedHeaders;
};

export const getAuthenticatedHeaders = () => {
    const authenticatedHeaders = new Headers();
    authenticatedHeaders.set("Content-Type", "application/json");
    authenticatedHeaders.set("x-api-key", ENV.API_KEY);
    authenticatedHeaders.set("Authorization", sessionStorage.getItem("access_token"));
    return authenticatedHeaders;
};
