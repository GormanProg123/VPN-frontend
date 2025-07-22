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

    signUp: build.mutation<
      { token: string, verificationCode: string},
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH_SIGN_UP,
        method: "POST",
        body: credentials,
      }),
    }),

    verify: build.mutation<
      { token: string },
      { email: string; code: string }
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH_VERIFY,
        method: "POST",
        body: credentials,
      }),
    }),

    request: build.mutation<
      { token: string, tokenExpiry:string},
      { email: string;  }
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH_PASSWORD_REQUEST,
        method: "POST",
        body: credentials,
      }),
    }),

    reset: build.mutation<
      { token: string },
      { token: string; newPassword: string }
    >({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH_PASSWORD_RESET,
        method: "POST",
        body: credentials,
      }),
    }),


  }),


  
  overrideExisting: false,
});

export const { useSignInMutation, useSignUpMutation, useVerifyMutation, useRequestMutation, useResetMutation  } = authApi;
