import LINKS from "@/constant/links";
import { IconBrandDiscord, IconBrandFacebook, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const socialLinks = [
  { Icon: IconBrandGithub, href: LINKS.github, label: "GitHub", color: "group-hover:text-white" },
  { Icon: IconBrandLinkedin, href: LINKS.linkedIn, label: "LinkedIn", color: "group-hover:text-[#0A66C2]" },
  { Icon: IconBrandDiscord, href: LINKS.discord, label: "Twitter", color: "group-hover:text-[#1DA1F2]" },
  { Icon: IconBrandFacebook, href: LINKS.facebook, label: "Email", color: "group-hover:text-[#1DA1F2]" },
];

export default socialLinks;
