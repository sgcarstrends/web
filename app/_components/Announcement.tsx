import { PropsWithChildren } from "react";

interface AnnouncementProps extends PropsWithChildren {}

export const Announcement = ({ children }: AnnouncementProps) => {
  return (
    <div className="bg-blue-600 p-4 text-center text-gray-50 shadow-lg">
      {children}
    </div>
  );
};
