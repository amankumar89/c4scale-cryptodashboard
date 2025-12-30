import { useState, useEffect, useCallback } from 'react';
import {
  fetchCryptoList,
  fetchMarketChart,
  fetchTopGainersAndLosers,
} from '../utils/apiClient';
import type {
  CryptoMarketData,
  FormattedChartData,
  TimePeriod,
  CryptoOption,
} from '../types/crypto.types';

export const useCryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCryptoList = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoList();
        const formattedList = data.map((crypto) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
        }));
        setCryptoList(formattedList);
        setError(null);
      } catch (err) {
        setError('Failed to load cryptocurrency list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCryptoList();
  }, []);

  return { cryptoList, loading, error };
};

export const useMarketChart = (coinId: string, days: TimePeriod) => {
  const [chartData, setChartData] = useState<FormattedChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChartData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMarketChart(coinId, days);

      const formatted: FormattedChartData[] = data.prices.map(
        ([timestamp, price], index) => ({
          timestamp,
          date: new Date(timestamp).toLocaleDateString(),
          price: Number(price.toFixed(2)),
          volume: Number((data.total_volumes[index]?.[1] || 0).toFixed(0)),
        })
      );

      setChartData(formatted);
      setError(null);
    } catch (err) {
      setError('Failed to load chart data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [coinId, days]);

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  return { chartData, loading, error, refetch: loadChartData };
};

export const useGainersLosers = () => {
  const [topGainer, setTopGainer] = useState<CryptoMarketData | null>(null);
  const [topLoser, setTopLoser] = useState<CryptoMarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGainersLosers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTopGainersAndLosers();
      setTopGainer(data.topGainer);
      setTopLoser(data.topLoser);
      setError(null);
    } catch (err) {
      setError('Failed to load gainers and losers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGainersLosers();
  }, [loadGainersLosers]);

  return { topGainer, topLoser, loading, error, refetch: loadGainersLosers };
};
