export type Story = {
  kicker: string;
  title: string;
  body: string[];
  meta?: [string, string][];
  tags?: string[];
  link?: { label: string; href: string };
};

export const person = {
  name: "Elias",
  surname: "Luzwehimana",
  role: "Senior Software Engineer · Product & Platform",
  location: "Stockholm, Sweden",
  email: "eliasnhunzwe@gmail.com",
  phone: "+46 72 775 91 88",
  phoneHref: "tel:+46727759188",
  linkedin: "https://www.linkedin.com/in/elias-luzwehimana-191a66233/",
  github: "https://github.com/USBAI",
  summary:
    "I build and own production software end to end: telecom data platforms at Telia, serverless SaaS at Coredination, shared platform APIs at Symetri, and Vornify AI, a product I founded and run.",
  availability: "Available now · Founding, senior & product engineering roles",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years shipping production software" },
  { value: 4, suffix: "", label: "Engineering teams" },
  { value: 2, suffix: "", label: "Companies founded" },
  { value: 20, suffix: "+", label: "Technologies in production" },
];

export type Slide = { src: string; alt: string; position?: string; label: string; caption: string; story: Story };

export const slides: Slide[] = [
  {
    src: "/images/portrait.webp",
    alt: "Elias Luzwehimana in a black hoodie in a Stockholm office",
    position: "50% 30%",
    label: "Stockholm",
    caption: "I own products from the first commit to production, and I stay accountable for what happens after launch.",
    story: {
      kicker: "About",
      title: "Engineer who thinks like an owner.",
      body: [
        "I've worked across telecom, construction tech and B2B SaaS, in teams from early-stage to enterprise scale. Across all of them I take the same approach: understand the business problem, ship the smallest useful version, then keep improving it in production.",
        "Alongside my employed roles I founded Clarge, a Stockholm software studio, and built Vornify AI, a platform that turns product ideas into working software.",
        "I'm now looking for a founding, senior or product engineering role at a company that moves fast and expects engineers to own outcomes.",
      ],
      meta: [["Based in", "Stockholm"], ["Focus", "Product & platform engineering"], ["Open to", "Hybrid, on-site or remote"]],
    },
  },
  {
    src: "/images/scrapathon.webp",
    alt: "Group photo of builders at the Antler × SSE Business Lab Scrapathon",
    position: "50% 45%",
    label: "Antler × SSE Business Lab",
    caption: "Scrapathon: 40 builders and 24 hours to go from idea to pitch.",
    story: {
      kicker: "Builder community",
      title: "24 hours, from idea to pitch.",
      body: [
        "Antler and SSE Business Lab gathered 40 builders in Stockholm for the Scrapathon: a 24-hour sprint to build and pitch a working product, supported by Anthropic, Google Cloud and Lovable.",
        "Hackathons like this are how I like to work at my best: a small team, a hard deadline, and a real product at the end.",
      ],
      meta: [["Format", "24-hour build"], ["Hosts", "Antler × SSE Business Lab"], ["Partners", "Anthropic, Google Cloud, Lovable"]],
    },
  },
  {
    src: "/images/dais.webp",
    alt: "Elias in conversation at a Data & AI Stockholm community evening",
    position: "50% 40%",
    label: "Data & AI Stockholm",
    caption: "DAIS Fest: conversations with the people building Stockholm's data and AI scene.",
    story: {
      kicker: "Community",
      title: "Staying close to the AI scene.",
      body: [
        "Data & AI Stockholm brings people from different backgrounds and expertise together to share ideas and learn from each other. I join to swap notes with founders, researchers and engineers on what is actually working in production AI.",
        "Most of my recent product work, including Vornify AI, is AI-native, so these conversations feed directly into what I build.",
      ],
      meta: [["Community", "Data & AI Stockholm"], ["Event", "DAIS Fest"]],
    },
  },
];

export const companies = [
  { name: "Symetri", logo: "/logos/symetri-full.svg" },
  { name: "Telia", logo: "/logos/telia.svg" },
  { name: "Coredination", logo: "/logos/coredination.svg" },
  { name: "Scania", logo: "/logos/scania.svg" },
];

export type Work = { name: string; type: string; summary: string; status?: string; href?: string; stack: string[]; featured?: boolean; story: Story };

export const work: Work[] = [
  {
    name: "Vornify AI",
    type: "Founder · AI product",
    status: "Live",
    href: "https://vornify.se",
    featured: true,
    summary: "An AI platform that turns product ideas into working web software. I designed, built and run it end to end.",
    stack: ["Next.js", "TypeScript", "LLMs", "Node.js", "Cloud"],
    story: {
      kicker: "Vornify AI · Founder",
      title: "From idea to working product.",
      body: [
        "Vornify started in 2020 as an open-source backend project: reusable CRUD and integration building blocks that let any frontend get a working backend fast.",
        "It has since become Vornify AI, a platform that takes a product idea and generates a working web application on top of that foundation.",
        "I own everything: product direction, architecture, AI integration, infrastructure and operations.",
      ],
      meta: [["Role", "Founder & engineer"], ["Since", "2020"], ["Status", "Live at vornify.se"]],
      tags: ["Product", "AI integration", "Architecture", "Operations"],
      link: { label: "Visit vornify.se", href: "https://vornify.se" },
    },
  },
  {
    name: "Broadband Data Mediation",
    type: "Telia · Lead engineer responsibilities",
    summary: "Customer portals and supporting services on Telia's broadband data mediation platform.",
    stack: ["React", "Node.js", "Kafka", "Elasticsearch", "Kubernetes"],
    story: {
      kicker: "Telia · 2025–2026",
      title: "Data mediation at telecom scale.",
      body: [
        "I worked in Telia's Broadband Data Mediation domain, building and maintaining the customer-facing portals and the services behind them.",
        "I took on lead engineer responsibilities: shaping features, improving the existing applications and moving them to scalable containerised deployments.",
      ],
      meta: [["Company", "Telia"], ["Period", "Jun 2025 – Aug 2026"], ["Location", "Solna"]],
      tags: ["React", "Node.js", "Kafka", "Elasticsearch", "Docker", "Kubernetes", "Grafana"],
    },
  },
  {
    name: "Field Service SaaS",
    type: "Coredination · Platform engineer",
    summary: "A B2B SaaS platform for field service management, built on serverless AWS, plus enterprise integrations for Scania.",
    stack: ["AWS Lambda", "GraphQL", "React", "DynamoDB", "PostgreSQL"],
    story: {
      kicker: "Coredination · 2021–2025",
      title: "Serverless SaaS, end to end.",
      body: [
        "Over three and a half years I worked across the whole platform: backend services, React frontends, GraphQL APIs and the AWS infrastructure underneath.",
        "For about five months I was embedded with Scania, one of our key customers, building internal tooling and data-heavy backend integrations: PostgreSQL pipelines, AWS RDS, REST APIs and Docker-based deployments.",
      ],
      meta: [["Company", "Coredination"], ["Period", "Oct 2021 – May 2025"], ["Client", "Scania"]],
      tags: ["AWS", "Serverless", "GraphQL", "React", "TypeScript", "PostgreSQL", "Docker", "DevOps"],
    },
  },
  {
    name: "Shared Platform APIs",
    type: "Symetri · Senior engineer",
    summary: "Reusable backend services and Web APIs for a platform used by construction and manufacturing customers.",
    stack: ["C#", ".NET", "ASP.NET Core", "EF Core"],
    story: {
      kicker: "Symetri Europe · 2026",
      title: "One platform, many products.",
      body: [
        "On the Common Services team I built reusable backend services and Web APIs for Symetri's shared software platform, which serves customers across construction and manufacturing.",
        "I worked in a 12-person cross-functional team with product, DevOps and engineering, and contributed to technical design.",
      ],
      meta: [["Company", "Symetri Europe"], ["Period", "Aug – Nov 2026"], ["Team", "12 people"]],
      tags: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "Web APIs"],
    },
  },
];

export const principles = [
  { title: "Own the outcome", text: "I don't stop at merged code. I want to know whether it moved the metric, and I stay with it until it does." },
  { title: "Ship in thin slices", text: "Put the smallest useful version in front of users first, then iterate on real feedback rather than guesses." },
  { title: "AI-native by default", text: "I use AI tools to move faster on the routine work and put LLM features into products where they actually add value." },
  { title: "Built for production", text: "Observability, containerised deploys and boring, reliable infrastructure, because the product has to hold up after launch." },
];

export type Role = { company: string; title: string; period: string; place: string; text: string; story?: Story };

export const experience: Role[] = [
  { company: "Symetri Europe", title: "Senior Software Engineer", period: "Aug 2026 – Nov 2026", place: "Solna · Hybrid", text: "Backend services and Web APIs for a shared platform in C# and .NET, in a 12-person cross-functional team." },
  { company: "Telia", title: "Software Engineer · Lead engineer responsibilities", period: "Jun 2025 – Aug 2026", place: "Solna", text: "Customer portals and services in Broadband Data Mediation, including containerised, scalable deployments." },
  { company: "Coredination", title: "Software Engineer", period: "Oct 2021 – May 2025", place: "Sundbyberg", text: "B2B field service SaaS on serverless AWS, React and GraphQL, including a ~5-month client engagement with Scania." },
  { company: "Clarge", title: "Founder", period: "Jul 2022 – Present", place: "Stockholm", text: "A software studio that partners with companies to design, build and run their software." },
  { company: "Vornify", title: "Founder", period: "2020 – Present", place: "Stockholm", text: "Started as an open-source backend framework and grew into Vornify AI." },
];

export const stack: [string, string[]][] = [
  ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript"]],
  ["Backend", ["Node.js", "Express", "C# / .NET", "ASP.NET Core", "GraphQL", "REST", "Python", "Django"]],
  ["Data", ["PostgreSQL", "MongoDB", "DynamoDB", "Kafka", "Elasticsearch / ELK"]],
  ["Cloud & Ops", ["AWS", "Lambda", "EC2", "Docker", "Kubernetes", "Grafana", "CI/CD"]],
  ["AI", ["LLM integration", "AI product design", "AI-assisted engineering"]],
];

export const education = [
  { school: "Chas Academy", what: "Software Engineering", period: "2023 – 2025" },
  { school: "KTH Royal Institute of Technology", what: "Computer Science studies", period: "2022 – 2023" },
  { school: "Swedish Defence University", what: "Security protection training", period: "2025" },
];
