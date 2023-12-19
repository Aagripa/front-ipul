'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import MemberData from '../components/dashboard/Memberdata';
import TitleCard from '../components/shared/TitleCard';
import DashboardCard from '../components/shared/DashboardCard';

const MemberPage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <TitleCard
      headtitle="User Data"
    />
    <DashboardCard>
      <MemberData/>
    </DashboardCard>
    </PageContainer>
  );
};

export default MemberPage;