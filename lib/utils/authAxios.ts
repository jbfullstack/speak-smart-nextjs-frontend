// import axios, { AxiosInstance } from "axios";
// import Router from "next/router";
// import { getTokens } from "./sessionToken";

// // Function to redirect to login
// const redirectToLogin = () => {
//   Router.push("/auth/login");
// };

// const createAuthAxios = (): AxiosInstance => {
//   console.log("Creating axios instance");
//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   });

//   instance.interceptors.request.use(async (config: any) => {
//     const { accessToken } = await getTokens();
//     if (accessToken) {
//       console.log("access token !");
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${accessToken}`,
//       };
//     } else {
//       console.log("no access token");
//     }
//     return config;
//   });

//   return instance;
// };

// export const authAxios = createAuthAxios();
