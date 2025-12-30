import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import type { CryptoMarketData } from "../../types/crypto.types";

interface CryptoCardProps {
  crypto: CryptoMarketData | null;
  type: "gainer" | "loser";
  loading: boolean;
}

export default function CryptoCard({ crypto, type, loading }: CryptoCardProps) {
  const isGainer = type === "gainer";
  const bgColor = isGainer ? "bg-green-50" : "bg-red-50";
  const borderColor = isGainer ? "border-green-500" : "border-red-500";
  const textColor = isGainer ? "text-green-700" : "text-red-700";
  const Icon = isGainer ? TrendingUp : TrendingDown;

  if (loading) {
    return (
      <Card className={`${bgColor} border-l-4 ${borderColor} shadow-md`}>
        <CardContent>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              className="w-85 h-16 mt-2"
            />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!crypto) {
    return (
      <Card className={`${bgColor} border-l-4 ${borderColor} shadow-md`}>
        <CardContent>
          <Typography variant="h6" className="font-semibold">
            No data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`w-65 sm:w-85 ${bgColor} border-l-4 ${borderColor} shadow-md`}
    >
      <CardContent>
        <Box className="flex items-center justify-between mb-2">
          <Typography variant="h6" className="font-semibold">
            {isGainer ? "Top Gainer" : "Top Loser"}
          </Typography>
          <Icon className={textColor} />
        </Box>

        <Typography variant="h5" className="font-bold mb-1">
          {crypto.name}
        </Typography>

        <Typography variant="body2" className="text-gray-600 mb-4">
          {crypto.symbol.toUpperCase()}
        </Typography>

        <Box className="space-y-2">
          <Box className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">
              Current Price:
            </Typography>
            <Typography variant="h6" className="font-semibold">
              $
              {crypto.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>

          <Box className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">
              24h Change:
            </Typography>
            <Box className="flex items-center gap-1">
              <Icon className={textColor} fontSize="small" />
              <Typography variant="h6" className={`font-bold ${textColor}`}>
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </Typography>
            </Box>
          </Box>

          <Box className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">
              24h Volume:
            </Typography>
            <Typography variant="body1" className="font-medium">
              ${(crypto.total_volume / 1000000).toFixed(2)}M
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
