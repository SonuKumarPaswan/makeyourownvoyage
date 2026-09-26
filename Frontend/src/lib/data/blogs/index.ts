import type { StateBlogData } from "./types";
import { himachalPradeshBlog } from "./himachalPradesh";
import { jammuKashmirBlog } from "./jammuKashmir";
import { uttarakhandBlog } from "./uttarakhand";
import { uttarPradeshBlog } from "./uttarPradesh";
import { rajasthanBlog } from "./rajasthan";

export * from "./types";
export { himachalPradeshBlog } from "./himachalPradesh";
export { jammuKashmirBlog } from "./jammuKashmir";
export { uttarakhandBlog } from "./uttarakhand";
export { uttarPradeshBlog } from "./uttarPradesh";
export { rajasthanBlog } from "./rajasthan";

export const BLOGS_DATABASE: Record<string, StateBlogData> = {
  "himachal-pradesh-blog": himachalPradeshBlog,
  "jammu-kashmir-blog": jammuKashmirBlog,
  "uttarakhand-blog": uttarakhandBlog,
  "uttar-pradesh-blog": uttarPradeshBlog,
  "rajasthan-blog": rajasthanBlog,
};

export const ALL_STATE_BLOGS: StateBlogData[] = [
  himachalPradeshBlog,
  jammuKashmirBlog,
  uttarakhandBlog,
  uttarPradeshBlog,
  rajasthanBlog,
];

export function getBlogData(slug: string): StateBlogData | null {
  const normalized = slug.toLowerCase().trim();
  if (BLOGS_DATABASE[normalized]) return BLOGS_DATABASE[normalized];

  if (normalized.includes("himachal")) return himachalPradeshBlog;
  if (normalized.includes("kashmir") || normalized.includes("jammu")) return jammuKashmirBlog;
  if (normalized.includes("uttarakhand") || normalized.includes("uttrakhand")) return uttarakhandBlog;
  if (normalized.includes("uttar-pradesh") || normalized.includes("up")) return uttarPradeshBlog;
  if (normalized.includes("rajasthan") || normalized.includes("rajsthan")) return rajasthanBlog;

  // Fallback
  return himachalPradeshBlog;
}
