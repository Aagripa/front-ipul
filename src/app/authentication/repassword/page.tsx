"use client";
import { Grid, Box, Card, } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthReset from "../auth/AuthReset"

const ResetPass = () => {
    return (
        <PageContainer title="Reset Password" description="this is Login page">
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
                            <AuthReset />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};
export default ResetPass;
