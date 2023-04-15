import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const initialState = {};

export const chartApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/api`,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["TABLE"],
  endpoints: (builder) => ({
    getChart: builder.query<any, void>({
      query: () => "/chart",
      providesTags: ["TABLE"],
    }),
    postChart: builder.mutation({
      query: (payload) => ({
        url: `/chart`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TABLE"],
    }),
    updateChart: builder.mutation({
      query: (payload) => ({
        url: `/chart/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["TABLE"],
    })
  }),
});

export const { useGetChartQuery, usePostChartMutation, useUpdateChartMutation } = chartApi;