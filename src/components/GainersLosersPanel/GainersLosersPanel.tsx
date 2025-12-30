import { Box, Grid, Typography, Alert, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useGainersLosers } from "../../hooks/useCoinGeckoAPI";
import CryptoCard from "./CryptoCard";

export default function GainersLosersPanel() {
  const { topGainer, topLoser, loading, error, refetch } = useGainersLosers();

  return (
    <Box>
      <Box className="flex items-center mb-4">
        <Typography variant="h5" component="h2" className="font-semibold">
          Market Movers (24h)
        </Typography>
        <IconButton onClick={refetch} color="primary" aria-label="refresh data">
          <Refresh />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <CryptoCard crypto={topGainer} type="gainer" loading={loading} />
        </Grid>
        <Grid xs={12} md={6}>
          <CryptoCard crypto={topLoser} type="loser" loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
}
