import { cloudinaryImageApi, cloudinaryVideoApi } from "@/lib/cloudinaryApi";

const LINKS = {
  resume: "https://drive.google.com/file/d/162GlYmVE-hL-oigbHO_wQmcMmJ9XuxRa/view?usp=sharing",

  // social
  github: "https://github.com/sadid56/",
  facebook: "https://www.facebook.com/sadidhasanx/",
  discord: "https://discord.com/users/1151169623149002752/",
  linkedIn: "https://www.linkedin.com/in/mr-sadid/",
  blog: "https://nexg-lab.vercel.app/",

  olynex: "https://olynex.com",

  mockuphive_video: `${cloudinaryVideoApi}/v1767085573/portfolio/videos/mockuphive_doldic.mp4`,
  mockuphive_thumnail: `${cloudinaryImageApi}/v1767086614/portfolio/projects/mockuphive-thumbnail_jgutxs.png`,
  mockuphive_live: "https://mockuphive.com/",

  // iconiex
  iconiex: "https://iconiex.com/",
  iconiex_video: `${cloudinaryVideoApi}/v1767100434/portfolio/videos/iconiex_qtex7r.mp4`,
  iconiex_thumnail: `${cloudinaryImageApi}/v1767100526/portfolio/projects/iconiex-thumbnail_xjtxts.png`,

  // drive pulse
  drivepulse: "https://drive-pulse-client.vercel.app/",
  drivepulse_video: `${cloudinaryVideoApi}/v1767101520/portfolio/videos/drivepulse_uxzkya.mp4`,
  drivepulse_thumnail: `${cloudinaryImageApi}/v1767101404/portfolio/projects/drivepulse-thumbnail_objnnu.png`,

  // nexg_lab
  nexg_lab: "https://nexg-lab.vercel.app/",
  nexg_lab_video: `${cloudinaryVideoApi}/v1767102299/portfolio/videos/nexg_lab_wywpmz.mp4`,
  nexg_lab_thumnail: `${cloudinaryImageApi}//v1767102011/portfolio/projects/nexg_lab-thumbnail_efpp0e.png`,
  nexg_github: "https://github.com/sadid56/nexg-lab",
};

export default LINKS;
