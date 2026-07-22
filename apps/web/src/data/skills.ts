import ICONS from "@/constant/icons";

/* ================= Tabs ================= */
export const TABS = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Databases & APIs", value: "databases" },
  { label: "DevOps & Tools", value: "devops" },
] as const;

export type SkillCategory = (typeof TABS)[number]["value"];

/* ================= Skill Interface ================= */
export interface Skill {
  id: number;
  name: string;
  side: string;
  logo: string;
  category: SkillCategory;
}

/* ================= Skills Data ================= */
const skills: Skill[] = [
  /* ===== Frontend ===== */
  {
    id: 1,
    name: "JavaScript",
    side: "Frontend / Backend",
    logo: ICONS.javascript,
    category: "frontend",
  },
  {
    id: 2,
    name: "TypeScript",
    side: "Frontend / Backend",
    logo: ICONS.typescript,
    category: "frontend",
  },
  {
    id: 3,
    name: "React.js",
    side: "Frontend",
    logo: ICONS.react,
    category: "frontend",
  },
  {
    id: 4,
    name: "Next.js",
    side: "Full Stack",
    logo: ICONS.nextjs,
    category: "frontend",
  },
  {
    id: 5,
    name: "HTML5",
    side: "Frontend",
    logo: ICONS.html,
    category: "frontend",
  },
  {
    id: 6,
    name: "CSS3",
    side: "Frontend",
    logo: ICONS.css,
    category: "frontend",
  },
  {
    id: 7,
    name: "Tailwind CSS",
    side: "Styling",
    logo: ICONS.tailwind,
    category: "frontend",
  },
  {
    id: 8,
    name: "MUI",
    side: "UI Components",
    logo: ICONS.mui,
    category: "frontend",
  },
  {
    id: 9,
    name: "Redux",
    side: "State Management",
    logo: ICONS.redux,
    category: "frontend",
  },
  {
    id: 10,
    name: "Remix",
    side: "Frontend",
    logo: ICONS.remix,
    category: "frontend",
  },

  /* ===== Backend ===== */
  {
    id: 11,
    name: "Node.js",
    side: "JavaScript Runtime",
    logo: ICONS.nodejs,
    category: "backend",
  },
  {
    id: 12,
    name: "Express.js",
    side: "Node.js Framework",
    logo: ICONS.express,
    category: "backend",
  },
  {
    id: 13,
    name: "JWT",
    side: "Authentication & Secure",
    logo: ICONS.jwt,
    category: "backend",
  },
  {
    id: 14,
    name: "Auth.js",
    side: "Authentication",
    logo: ICONS.next_auth,
    category: "backend",
  },
  {
    id: 15,
    name: "Firebase Auth",
    side: "Authentication & Storage",
    logo: ICONS.firebase,
    category: "backend",
  },

  /* ===== Databases & APIs ===== */
  {
    id: 16,
    name: "MongoDB",
    side: "NoSQL Database",
    logo: ICONS.mongodb,
    category: "databases",
  },
  {
    id: 17,
    name: "Mongoose",
    side: "ODM",
    logo: ICONS.mongoose,
    category: "databases",
  },
  {
    id: 24,
    name: "PostgreSQL",
    side: "Relational Database",
    logo: ICONS.postgresql,
    category: "databases",
  },
  {
    id: 25,
    name: "Prisma ORM",
    side: "Database ORM",
    logo: ICONS.prisma,
    category: "databases",
  },

  /* ===== DevOps & Tools ===== */
  {
    id: 18,
    name: "Git",
    side: "Version Control",
    logo: ICONS.git,
    category: "devops",
  },
  {
    id: 19,
    name: "GitHub",
    side: "Code Hosting",
    logo: ICONS.github,
    category: "devops",
  },
  {
    id: 20,
    name: "Vercel",
    side: "Deployment",
    logo: ICONS.vercel,
    category: "devops",
  },
  {
    id: 21,
    name: "AWS",
    side: "Cloud Services",
    logo: ICONS.aws,
    category: "devops",
  },
  {
    id: 22,
    name: "Figma",
    side: "UI/UX Design",
    logo: ICONS.figma,
    category: "devops",
  },
  {
    id: 23,
    name: "Canva",
    side: "Design Tool",
    logo: ICONS.canva,
    category: "devops",
  },
];

export default skills;
