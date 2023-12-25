import { PropsWithChildren } from "react";

interface AnnouncementProps extends PropsWithChildren {}

export const Announcement = ({ children }: AnnouncementProps) => {
  return (
    <div className="bg-yellow-500 p-4 text-center shadow shadow-yellow-600">
      {children}
    </div>
  );
};
