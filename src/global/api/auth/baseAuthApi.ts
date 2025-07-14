import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
});
