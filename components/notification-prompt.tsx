"use client";

import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import useStore from "@/app/store";

export const NotificationPrompt = () => {
  const { notificationStatus, setNotificationStatus } = useStore();

  useEffect(() => {
    if (!("Notification" in window)) {
      return;
    }

    const status = Notification.permission;
    setNotificationStatus(status);
  }, [setNotificationStatus]);

  const handleAllow = useCallback(async () => {
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);

    toast.success("Notifications Enabled!", {
      description:
        "You will now receive updates and alerts whenever new data is published",
    });
  }, [setNotificationStatus]);

  const handleDeny = useCallback(() => {
    setNotificationStatus("denied");

    toast.warning("Notifications Disabled!", {
      description:
        "You will not receive updates and alerts whenever new data is published",
    });
  }, [setNotificationStatus]);

  useEffect(() => {
    switch (notificationStatus) {
      case "default":
        toast("Enable Notifications?", {
          duration: Infinity,
          description:
            "Stay updated with the latest news and alerts by enabling browser notifications",
          action: {
            label: "Allow",
            onClick: handleAllow,
          },
          cancel: {
            label: "Deny",
            onClick: handleDeny,
          },
        });
        break;
      default:
        break;
    }
  }, [handleAllow, handleDeny, notificationStatus]);

  return null;
};
