interface Props {
  announcement: string;
}

export const Announcement = ({ announcement }: Props) => {
  return (
    <div
      className="bg-blue-600 p-2 text-center text-gray-50 shadow-lg"
      dangerouslySetInnerHTML={{ __html: announcement }}
    />
  );
};
