import { ComingSoon } from "@/app/_components/ComingSoon";

const TabPage = ({ params }: { params: { tab: string } }) => {
  return <ComingSoon page={params.tab} />;
};

export default TabPage;
