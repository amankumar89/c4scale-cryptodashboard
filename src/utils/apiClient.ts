import axios from "axios";
import type { CryptoMarketData, ChartData } from "../types/crypto.types";

const BASE_URL = "https://api.coingecko.com/api/v3";

const coinGeckoAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchCryptoList = async (): Promise<CryptoMarketData[]> => {
  const response = await coinGeckoAPI.get<CryptoMarketData[]>(
    "/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    }
  );
  return response.data;
};

export const fetchMarketChart = async (
  coinId: string,
  days: number
): Promise<ChartData> => {
  const response = await coinGeckoAPI.get<ChartData>(
    `/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: days,
      },
    }
  );
  return response.data;
};

export const fetchTopGainersAndLosers = async () => {
  const response = await coinGeckoAPI.get<CryptoMarketData[]>(
    "/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    }
  );

  const sortedByChange = [...response.data].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  return {
    topGainer: sortedByChange[0],
    topLoser: sortedByChange[sortedByChange.length - 1],
  };
};
