import LINKS from "@/constant/links";

const projects = [
  {
    id: 1,
    project_name: "MockupHive | OlynexLLC",
    description:
      "MockupHive is a premium platform by OlynexLLC where users can download professional mockup files for Photoshop. It features an innovative online editor for browser-based customization, along with dedicated plugins for Figma and Adobe tools. The platform includes a robust admin dashboard for comprehensive management.",
    project_thumnail: LINKS.mockuphive_thumnail,
    technology: [
      "Next.js",
      "TypeScript",
      "Tailwindcss",
      "Framer Motion",
      "Shadcn/ui",
      "NodeJS",
      "ExpressJS",
      "Mongoose",
      "NextAuth",
      "Figma API",
      "Adobe API",
      "JWT",
      "Stripe",
    ],
    live_link: LINKS.mockuphive_live,
    video_url: LINKS.mockuphive_video,
    company: {
      name: "OlynexLLC",
      url: LINKS.olynex,
    },
  },
  {
    id: 2,
    project_name: "Iconiex | OlynexLLC",
    description:
      "Iconiex is an extensive icon ecosystem by OlynexLLC, featuring Adobe and Figma plugins. Users can seamlessly download and integrate high-quality icons into their designs, as well as contribute to the growing library. Built for professional designers and developers.",
    project_thumnail: LINKS.iconiex_thumnail,
    technology: [
      "Next.js",
      "TypeScript",
      "Tailwindcss",
      "Prime React",
      "Node.js",
      "ExpressJS",
      "Mongoose",
      "Figma API",
      "JWT",
      "Stripe",
      "Firebase",
    ],
    live_link: LINKS.iconiex,
    video_url: LINKS.iconiex_video,
    company: {
      name: "OlynexLLC",
      url: LINKS.olynex,
    },
  },
  {
    id: 3,
    project_name: "DrivePulse | Team",
    description:
      "A TEAM project, this is a online file sharing website user can upload file and share this file in real-time, impliment a real-time chat function because users can callabration in another users.",
    project_thumnail: LINKS.drivepulse_thumnail,
    technology: ["Next.js", "TypeScript", "Tailwindcss", "Jwt", "Mongoose", "ExpressJs", "Node.js", "socket.io", "Firebase"],
    client_github_link: "https://github.com/Binary-Masters/DrivePulse-Client",
    server_github_link: "https://github.com/Binary-Masters/DrivePulse-Server",
    live_link: LINKS.drivepulse,
    video_url: LINKS.drivepulse_video,
    contributors: [
      {
        name: "Shahidul Islam",
        fb: "https://www.facebook.com/profile.php?id=100007891637711",
      },
      {
        name: "Md. Morshed Alam",
        fb: "https://www.facebook.com/mdmorsed.alam.9809",
      },
      {
        name: "Zaib Khan",
        fb: "https://www.facebook.com/scarcrack",
      },
      {
        name: "Kamruj Jaman",
        fb: "https://www.facebook.com/kj.rahil",
      },
      {
        name: "Abu Bokor Siddiq",
        fb: "https://www.facebook.com/profile.php?id=100024960182776",
      },
    ],
  },
  {
    id: 4,
    project_name: "NexgLab",
    description:
      "NexgLab is my personal blog website where I share my experiences, thoughts, and learnings. I built it to have a clean and simple space to showcase my personal journey, projects, and insights. The platform is designed with a modern interface, making it easy for me to manage and present my content.",
    project_thumnail: LINKS.nexg_lab_thumnail,
    technology: ["Next.js", "TypeScript", "Tailwindcss", "BetterAuth", "PostgreSQL", "Prisma", "NeonDB", "Shadcn/ui"],
    client_github_link: LINKS.nexg_github,
    live_link: LINKS.nexg_lab,
    video_url: LINKS.nexg_lab_video,
  },
];
export default projects;
