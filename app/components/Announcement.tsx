import type { PropsWithChildren } from "react";

interface AnnouncementProps extends PropsWithChildren {}

export const Announcement = ({ children }: AnnouncementProps) => {
  return (
    <div className="bg-primary p-4 text-center text-primary-foreground">
      {children}
    </div>
  );
};
