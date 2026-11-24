import { education, projects, slides, work, type Story } from "./content";

/* Everything that can be opened in a "Read more" room, with what the suggestions need. */
export type Entry = {
  id: string;
  group: string;
  story: Story;
  summary: string;
  image?: string;
  position?: string;
  credit?: string;
  logo?: string;
  mark?: string;
  partner?: { logo: string; name: string; note: string };
  logos?: { src: string; name: string }[];
};

export const ENTRIES: Entry[] = [
  ...work.map((w) => ({ id: `work-${w.name}`, group: "Work", story: w.story, summary: w.summary, logo: w.logo, mark: w.mark, partner: w.partner, image: w.banner?.src, position: w.banner?.position, credit: w.banner?.credit })),
  ...education.map((e) => ({ id: `study-${e.school}`, group: "Studies", story: e.story, summary: e.text, logo: e.logo, mark: e.mark, image: e.banner?.src, position: e.banner?.position, credit: e.banner?.credit })),
  ...projects.map((w) => ({ id: `project-${w.name}`, group: "Projects", story: w.story, summary: w.summary, logo: w.logo, mark: w.mark, image: w.banner?.src, position: w.banner?.position, credit: w.banner?.credit })),
  ...slides.map((s) => ({ id: `moment-${s.label}`, group: "Moments", story: s.story, summary: s.caption, image: s.src, position: s.position, logos: s.logos })),
];

export const entry = (id: string) => ENTRIES.find((e) => e.id === id)!;

/* Up to three suggestions: the rest of the same group first, then the strongest pieces elsewhere. */
const FEATURED = ["work-Broadband Data Mediation", "project-Clarge", "study-Swedish Defence University", "work-User information platform", "project-Vornify AI", "work-Field Service SaaS"];
export function suggestionsFor(id: string): Entry[] {
  const me = entry(id);
  const same = ENTRIES.filter((e) => e.group === me.group && e.id !== id);
  const others = FEATURED.map(entry).filter((e) => e.group !== me.group);
  return [...same, ...others].slice(0, 3);
}
