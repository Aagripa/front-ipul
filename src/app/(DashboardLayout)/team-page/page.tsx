'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import TitleCard from '../components/shared/TitleCard';
import TeamData from '../components/dashboard/TeamData';

const TeamPage = () => {
  return (
    <PageContainer title="Team Page" description="this is Team page">
      <TitleCard
        headtitle="Teams"
      />
      <DashboardCard>
        <TeamData />
      </DashboardCard>
    </PageContainer>
  );
};

export default TeamPage;