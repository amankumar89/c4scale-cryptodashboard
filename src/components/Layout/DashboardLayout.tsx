import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box className="min-h-screen" sx={{ bgcolor: "#FCF8F8" }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <TrendingUp className="mr-2" />
          <Typography variant="h6" component="h1" className="grow font-bold">
            C4Scale - Crypto Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="py-8">
        {children}
      </Container>
    </Box>
  );
}
