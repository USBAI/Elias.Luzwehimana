import { education, projects, security, slides, work, type Story } from "./content";

/* Everything that can be opened in a "Read more" room, with what the suggestions need. */
export type Entry = {
  id: string;
  group: string;
  story: Story;
  summary: string;
  image?: string;
  position?: string;
  logo?: string;
  mark?: string;
  partner?: { logo: string; name: string; note: string };
  logos?: { src: string; name: string }[];
};

export const ENTRIES: Entry[] = [
  ...work.map((w) => ({ id: `work-${w.name}`, group: "Work", story: w.story, summary: w.summary, logo: w.logo, mark: w.mark, partner: w.partner })),
  ...education.map((e) => ({ id: `study-${e.school}`, group: "Studies", story: e.story, summary: e.text, logo: e.logo, mark: e.mark })),
  ...projects.map((w) => ({ id: `project-${w.name}`, group: "Projects", story: w.story, summary: w.summary, logo: w.logo, mark: w.mark })),
  ...slides.map((s) => ({ id: `moment-${s.label}`, group: "Moments", story: s.story, summary: s.caption, image: s.src, position: s.position, logos: s.logos })),
  ...security.map((x) => ({ id: `security-${x.name}`, group: "Security", story: x.story, summary: x.summary, logo: x.logo ?? "/logos/shield.svg", image: x.image })),
];

export const entry = (id: string) => ENTRIES.find((e) => e.id === id)!;

/* Up to three suggestions: the rest of the same group first, then the strongest pieces elsewhere. */
const FEATURED = ["project-Vornify AI", "work-Broadband Data Mediation", "security-Security protection training", "work-User information platform", "project-Clarge", "work-Field Service SaaS"];
export function suggestionsFor(id: string): Entry[] {
  const me = entry(id);
  const same = ENTRIES.filter((e) => e.group === me.group && e.id !== id);
  const others = FEATURED.map(entry).filter((e) => e.group !== me.group);
  return [...same, ...others].slice(0, 3);
}
