// src/store/marketsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_URL_CHAT;

interface CoinData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
}

interface PricesResponse {
  pagination: {
    start: number;
    limit: number;
    nextStart: number;
  };
  data: CoinData[];
}

export const marketsApi = createApi({
  reducerPath: "marketsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/markets`,
  }),

  tagTypes: ["Prices"],

  endpoints: (builder) => ({
    getPrices: builder.query<PricesResponse, { start: number; limit: number }>({
      query: ({ start, limit }) => `prices?start=${start}&limit=${limit}`,

      // Cache each page for 5 minutes
      keepUnusedDataFor: 3600,

      // Each unique request is cached separately
      serializeQueryArgs: ({ queryArgs }) => {
        return `start=${queryArgs.start}-limit=${queryArgs.limit}`;
      },

      providesTags: (result, error, arg) => [
        { type: "Prices", id: `page-${arg.start}` },
      ],
    }),
  }),
});

export const { useGetPricesQuery } = marketsApi;
