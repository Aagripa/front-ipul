'use client'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { getProject } from "@/app/api/proyek/route";
import { useEffect, useState } from "react";

const YearlyBreakup = () => {
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projects = await getProject();
        setProjectData(projects);
        console.log('ni :', projectData)
      } catch (error) {
        // Handle error fetching project data
        console.error('Error fetching project data:', error);
      }
    }

    fetchData();
  }, []);


  // chart color
  const theme = useTheme();

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 300,
      widht: 200
    },
    colors: ['#13DEB9', '#FFAE1F', 'divider'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '80%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };
  //Data untuk chart
  const countCompleted = projectData.filter(project => project.status === 'Completed').length;
  const countInProgress = projectData.filter(project => project.status === 'InProgress').length;
  const countPending = projectData.filter(project => project.status === 'Pending').length;

  const seriescolumnchart: any = [countCompleted, countInProgress, countPending];

  console.log(countCompleted, '|', countInProgress, '|', countPending)
  return (
    <DashboardCard title="Status Project">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            Jumlah Semua Project
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Typography variant="subtitle2" fontWeight="600">
              {projectData.length}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              project
            </Typography>
          </Stack>
          <Stack spacing='1px' mt={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: '#13DEB9', svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {countCompleted} Completed
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: '#FFAE1F', svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {countInProgress} In Progress
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: 'divider', svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {countPending} Pending
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="250px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
