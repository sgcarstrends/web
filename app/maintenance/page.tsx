import { MaintenanceNotice } from "@/components/maintenance-notice";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const MaintenancePage = () => {
  return <MaintenanceNotice />;
};

export default MaintenancePage;
