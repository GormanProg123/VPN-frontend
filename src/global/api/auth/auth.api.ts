import { API_ENDPOINTS } from "../api.consts";
import { baseAuthApi } from "./baseAuthApi";

export const authApi = baseAuthApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH_SIGN_IN,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = authApi;
