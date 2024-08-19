import { DesktopNavMenu, MobileNavMenu } from "@/app/components/NavMenu";

export const Header = () => {
  return (
    <header className="border-b-2 bg-white">
      <MobileNavMenu />
      <DesktopNavMenu />
    </header>
  );
};
