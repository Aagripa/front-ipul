"use client";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const Login = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box style={{
        backgroundImage: "url(/images/backgrounds/bg.png)",
        backgroundSize: "cover"
      }}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Box mt="20px" display="flex" alignItems="center" justifyContent="center">
                <Stack textAlign="center">
                <Typography variant="h2">TPS PLAN</Typography>
                  <Typography variant="subtitle1">Planning Sebuah Project dan Monitor Semua Proses</Typography>
                </Stack>
              </Box>
              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login;
