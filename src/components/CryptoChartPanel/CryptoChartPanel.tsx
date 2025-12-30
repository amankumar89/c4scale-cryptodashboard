import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useCryptoList, useMarketChart } from "../../hooks/useCoinGeckoAPI";
import CryptoSelector from "./CryptoSelector";
import TimePeriodSelector from "./TimePeriodSelector";
import type { TimePeriod } from "../../types/crypto.types";

export default function CryptoChartPanel() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(7);

  const { cryptoList, loading: listLoading } = useCryptoList();
  const {
    chartData,
    loading: chartLoading,
    error,
    refetch,
  } = useMarketChart(selectedCrypto, selectedPeriod);

  const formatPrice = (value: number | undefined) => {
    return `$${value?.toLocaleString()}`;
  };

  const formatVolume = (value: number | undefined) => {
    return `$${(value ? value / 100000000 : 0).toFixed(2)}M`;
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Typography variant="h5" component="h2" className="font-semibold">
            Cryptocurrency Analysis
          </Typography>
          <IconButton
            onClick={refetch}
            color="primary"
            aria-label="refresh data"
          >
            <Refresh />
          </IconButton>
        </Box>

        <Box className="flex flex-col lg:flex-row gap-4 mb-6">
          <CryptoSelector
            cryptoList={cryptoList}
            selectedCrypto={selectedCrypto}
            onCryptoChange={setSelectedCrypto}
            loading={listLoading}
          />
          <TimePeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {chartLoading ? (
          <Box className="flex justify-center items-center py-20">
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Box className="mb-8">
              <Typography variant="h6" className="mb-4 font-medium">
                Price History (USD)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#666" />
                  <YAxis
                    tickFormatter={formatPrice}
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      formatPrice(value)
                    }
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                    name="Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box>
              <Typography variant="h6" className="mb-4 font-medium">
                Trading Volume (USD)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#666" />
                  <YAxis
                    tickFormatter={formatVolume}
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      formatVolume(value)
                    }
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="volume" fill="#10b981" name="Volume" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
