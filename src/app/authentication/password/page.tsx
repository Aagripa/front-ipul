"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthPass from "../auth/AuthPass";

const ForPass = () => {
    return (
        <PageContainer title="Forgot Password" description="this is Login page">
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
                            <AuthPass />
                            <Stack
                                justifyContent="flex-end"
                                direction="row"
                                alignItems="left"
                                mt={2}
                            >
                                <Typography
                                    component={Link}
                                    href="/authentication/login"
                                    fontWeight="500"
                                    sx={{
                                        textDecoration: "none",
                                        color: "primary.main",
                                    }}
                                >
                                    Kembali Halaman Login
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};
export default ForPass;
