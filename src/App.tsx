import { Box } from "@mui/material";
import DashboardLayout from "./components/Layout/DashboardLayout";
import CryptoChartPanel from "./components/CryptoChartPanel/CryptoChartPanel";
import GainersLosersPanel from "./components/GainersLosersPanel/GainersLosersPanel";

function App() {
  return (
    <DashboardLayout>
      <Box className="space-y-8">
        <GainersLosersPanel />
        <CryptoChartPanel />
      </Box>
    </DashboardLayout>
  );
}

export default App;
