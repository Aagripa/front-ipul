'use client'
import React, { useEffect, useState } from 'react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { getUser } from '@/app/api/user/route';
import { Typography } from '@mui/material';

const DataUser = () => {
    const [userData, setUserData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser();
                setUserData(user);
                console.log(user)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const totalUsers = userData?.length || 0;

    return (
        <DashboardCard title="Total User Data">
            <Typography variant='h1'>{totalUsers}</Typography>
        </DashboardCard>
    );
};

export default DataUser;
