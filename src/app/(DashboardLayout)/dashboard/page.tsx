'use client'
import { Grid, Box, Stack } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import TitleCard from '../components/shared/TitleCard';
import DataUser from '@/app/(DashboardLayout)/components/dashboard/DataUser';
import DataTeam from '../components/dashboard/DataTeam';
import { useEffect, useState } from 'react';
import { GetProfil } from '@/app/api/user/route';

const Dashboard = () => {
  const [profile, setProfile] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await GetProfil();
        setProfile(profileData.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <TitleCard
        headtitle={`Welcome,${profile}!`}
      />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              <DataUser />
              <DataTeam />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={7} >
            <YearlyBreakup />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
