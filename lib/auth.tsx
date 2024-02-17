// // lib/auth.ts
// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: process.env.NEXTAUTH_URL, // Use the environment variable
//   withCredentials: true, // This is necessary to send cookies
// });

// interface User {
//   pseudo: string;
//   accessToken: string;
//   refreshToken: string;
// }

// export const login = async (
//   pseudo: string,
//   password: string
// ): Promise<User | null> => {
//   try {
//     const response = await apiClient.post("/authentication/sign-in", {
//       pseudo,
//       password,
//     });
//     if (response.data.status === 200) {
//       return {
//         pseudo: response.data.data.pseudo,
//         accessToken: response.data.data.accessToken,
//         refreshToken: response.data.data.refreshToken,
//       };
//     }
//   } catch (error) {
//     // Handle network issues or wrong credentials
//     console.error("Login error:", error);
//     throw new Error("Login failed");
//   }
//   return null;
// };

// export const signup = async (
//   pseudo: string,
//   password: string
// ): Promise<User | null> => {
//   try {
//     const response = await apiClient.post("/authentication/sign-up", {
//       pseudo,
//       password,
//     });
//     if (response.data.status === 200) {
//       return {
//         pseudo: response.data.data.pseudo,
//         accessToken: response.data.data.accessToken,
//         refreshToken: response.data.data.refreshToken,
//       };
//     }
//   } catch (error) {
//     // Handle signup errors
//     console.error("Signup error:", error);
//     throw new Error("Signup failed");
//   }
//   return null;
// };

// // export const refreshToken = async (
// //   refreshToken: string
// // ): Promise<User | null> => {
// //   try {
// //     const response = await apiClient.post("/authentication/refresh-tokens", {
// //       refreshToken,
// //     });
// //     if (response.data.status === 200) {
// //       return {
// //         pseudo: response.data.data.pseudo,
// //         accessToken: response.data.data.accessToken,
// //         refreshToken: response.data.data.refreshToken,
// //       };
// //     }
// //   } catch (error) {
// //     // Handle refresh token errors (e.g., redirect to login)
// //     console.error("Refresh token error:", error);
// //     throw new Error("Failed to refresh token");
// //   }
// //   return null;
// // };
