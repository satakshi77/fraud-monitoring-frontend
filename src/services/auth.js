import API from "./api";

// SIGNUP
export const signup = (data) => API.post("/auth/signup", data);

// LOGIN
export const login = (data) => API.post("/auth/login", data);

// REFRESH TOKEN
export const refreshToken = () => API.post("/auth/refresh");

// LOGOUT
export const logout = () => API.post("/auth/logout");