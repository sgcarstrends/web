"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Maintenance } from "@/components/Maintenance";

const MaintenancePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        // TODO: Simulating this for now
        const isMaintenanceMode = process.env.MAINTENANCE_MODE;

        if (!isMaintenanceMode) {
          const from = searchParams.get("from");
          if (from) {
            router.replace(decodeURIComponent(from));
          } else {
            router.replace("/");
          }
        }
      } catch (e) {
        console.error("Error checking maintenance status:", e);
      }
    };

    const interval = setInterval(checkMaintenance, 5000);

    void checkMaintenance();

    return () => clearInterval(interval);
  }, [router, searchParams]);

  return <Maintenance />;
};

export default MaintenancePage;
