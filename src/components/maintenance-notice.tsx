"use client";

import { Chip, Link } from "@heroui/react";
import { AlertTriangle, Clock } from "lucide-react";
import useMaintenance from "@/hooks/use-maintenance";

export const MaintenanceNotice = () => {
  useMaintenance();

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="flex flex-col items-center pb-6">
          <AlertTriangle className="text-primary mb-4 size-16" />
          <h1 className="text-foreground text-3xl font-semibold">
            System Maintenance
          </h1>
        </div>
        <div className="space-y-4 text-center">
          <p className="text-foreground-600">
            We are currently performing scheduled maintenance to improve your
            experience. Our services will be back online shortly.
          </p>
          <Chip
            startContent={<Clock className="size-4" />}
            variant="shadow"
            color="primary"
            size="lg"
          >
            Estimated downtime: 2 hours
          </Chip>
        </div>
        <div className="border-divider my-6 border-t"></div>
        <div className="flex flex-col items-center">
          <p className="text-foreground-600 text-center text-sm">
            For urgent inquiries, please contact our support team at:
            <br />
            <Link
              href="mailto:support@sgcarstrends.com"
              color="primary"
              className="text-sm"
            >
              support@sgcarstrends.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
