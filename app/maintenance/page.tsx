"use client";

import { Suspense } from "react";
import { MaintenanceNotice } from "@/app/maintenance/components/maintenance-notice";

const MaintenancePage = () => {
  return (
    <Suspense fallback={null}>
      <MaintenanceNotice />
    </Suspense>
  );
};

export default MaintenancePage;
