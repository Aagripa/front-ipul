'use client'
import React, { useEffect, useState } from 'react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { getTeam } from '@/app/api/team/route';
import { Typography } from '@mui/material';

const DataTeam = () => {
    const [teamData, setTeamData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const team = await getTeam();
                setTeamData(team);
                console.log(team)
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchData();
    }, []);

    const totalTeams = teamData?.length || 0;
    return (
        <DashboardCard title="Total Tim" >
            <Typography variant='h1'>{totalTeams}</Typography>
        </DashboardCard>
    );
};

export default DataTeam;