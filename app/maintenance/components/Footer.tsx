import {
  type IconType,
  SiBluesky,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiThreads,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Separator } from "@/components/ui/separator";

interface SocialMediaLink {
  name: string;
  url: string;
  icon: IconType;
}

const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/sgcarstrends",
    icon: SiFacebook,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/sgcarstrends",
    icon: SiX,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/sgcarstrends",
    icon: SiInstagram,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/sgcarstrends",
    icon: SiLinkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/sgcarstrends",
    icon: SiGithub,
  },
  {
    name: "Threads",
    url: "https://threads.net/sgcarstrends",
    icon: SiThreads,
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/sgcarstrends.com",
    icon: SiBluesky,
  },
].toSorted((a, b) => a.name.localeCompare(b.name));

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto bg-white px-4 py-8">
      <div className="text-center">
        <div className="mb-4 font-semibold text-gray-900">Follow Us</div>
        <div className="flex justify-center gap-4">
          {socialMediaLinks.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 transition-colors hover:text-primary"
              aria-label={name}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col items-center gap-4 text-sm text-gray-600 md:flex-row md:justify-between">
        <div>
          Data provided by{" "}
          <a
            href="https://datamall.lta.gov.sg/content/datamall/en/static-data.html"
            target="_blank"
            rel="nofollow noreferrer"
            className="text-blue-600 hover:underline"
          >
            Land Transport Datamall
          </a>
        </div>
        <div>&copy; {currentYear}. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
