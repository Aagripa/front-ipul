'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ProjectData from '@/app/(DashboardLayout)/components/dashboard/Projectdata'
import TitleCard from '../components/shared/TitleCard';

const ProjectPage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <TitleCard
        headtitle="Projects"
      />
      <ProjectData />
    </PageContainer>
  );
};

export default ProjectPage;