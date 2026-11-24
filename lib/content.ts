export type Story = {
  kicker: string;
  title: string;
  body: string[];
  meta?: [string, string][];
  tags?: string[];
  link?: { label: string; href: string };
  sections?: { title: string; items: string[] }[];
};

export const person = {
  name: "Elias",
  surname: "Luzwehimana",
  role: "Senior Software Engineer, Stockholm",
  location: "Stockholm, Sweden",
  email: "eliasnhunzwe@gmail.com",
  phone: "+46 72 775 91 88",
  phoneHref: "tel:+46727759188",
  linkedin: "https://www.linkedin.com/in/elias-luzwehimana-191a66233/",
  github: "https://github.com/USBAI",
  summary:
    "I build and run production software. Most recently platform APIs at Symetri and data mediation at Telia, alongside Vornify AI, my own product.",
  availability: "Open to new roles",
};

export type Slide = { src: string; alt: string; position?: string; mobilePosition?: string; logos?: { src: string; name: string }[]; label: string; caption: string; story: Story };

export const slides: Slide[] = [
  {
    src: "/images/portrait.webp",
    alt: "Elias Luzwehimana in a black hoodie in a Stockholm office",
    position: "50% 8%",
    mobilePosition: "50% 20%",
    label: "Day to day",
    caption: "Building platform, product and AI software in Stockholm.",
    story: {
      kicker: "About",
      title: "Elias Luzwehimana",
      sections: [
        { title: "What I'm looking for", items: ["Senior, founding or product engineering roles", "Teams that ship fast and give engineers ownership", "Stockholm: hybrid, on-site or remote"] },
        { title: "Where I've worked", items: ["Symetri Europe: shared platform APIs in C# and .NET", "Telia: broadband data mediation portals", "Coredination: serverless B2B SaaS, plus a Scania engagement"] },
      ],
      body: [
        "I'm a software engineer with 5+ years across telecom, construction tech and B2B SaaS: Telia, Coredination (including a client engagement with Scania) and Symetri.",
        "Alongside that I run Clarge, a small software studio, and Vornify AI, a product I built and operate.",
        "I'm looking for a senior, founding or product engineering role.",
      ],
      meta: [["Based in", "Stockholm"], ["Focus", "Product & platform engineering"], ["Open to", "Hybrid, on-site or remote"]],
    },
  },
  {
    src: "/images/scrapathon.webp",
    alt: "Group photo of builders at the Antler × SSE Business Lab Scrapathon",
    position: "50% 50%",
    logos: [{ src: "/logos/antler.svg", name: "Antler" }, { src: "/logos/sse.svg", name: "SSE Business Lab" }],
    label: "Scrapathon",
    caption: "Antler × SSE Business Lab. 40 builders, 24 hours.",
    story: {
      kicker: "Builder community",
      title: "Scrapathon",
      body: [
        "A 24-hour build-and-pitch event in Stockholm with 40 builders, run by Antler and SSE Business Lab with support from Anthropic, Google Cloud and Lovable.",
      ],
      meta: [["Format", "24-hour build"], ["Hosts", "Antler × SSE Business Lab"], ["Partners", "Anthropic, Google Cloud, Lovable"]],
    },
  },
  {
    src: "/images/dais.webp",
    alt: "Elias in conversation at a Data & AI Stockholm community evening",
    position: "50% 62%",
    mobilePosition: "80% 60%",
    logos: [{ src: "/logos/dais.png", name: "Data & AI Stockholm" }],
    label: "Data & AI Stockholm",
    caption: "DAIS Fest with the Stockholm data and AI community.",
    story: {
      kicker: "Community",
      title: "DAIS Fest",
      body: [
        "An evening with the Data & AI Stockholm community: founders, researchers and engineers working with data and AI in the city.",
      ],
      meta: [["Community", "Data & AI Stockholm"], ["Event", "DAIS Fest"]],
    },
  },
];


export type Partner = { logo: string; name: string; note: string };
export type Banner = { src: string; position?: string; credit?: string };
export type Work = { banner?: Banner; name: string; role?: string; company?: string; highlights?: string[]; facts?: string[]; type: string; logo?: string; mark?: string; partner?: Partner; summary: string; status?: string; href?: string; stack: string[]; featured?: boolean; story: Story };

export const work: Work[] = [
  {
    banner: { src: "/banners/symetri.webp", position: "76% 50%", credit: "Image: Symetri" },
    name: "User information platform",
    role: "Senior Software Engineer",
    company: "Symetri Europe",
    logo: "/logos/symetri-full.svg",
    type: "Symetri Europe · Aug – Nov 2026",
    summary: "Owned the internal system that manages user information, working directly with the Head of Technology and the CISO.",
    facts: ["Security-critical data", "Worked with CISO", "C# · .NET"],
    stack: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "Web APIs"],
    story: {
      kicker: "Symetri Europe · Senior Software Engineer",
      title: "User information platform",
      body: [
        "At Symetri I owned the internal system that manages user information: the codebase, its Web APIs and the services around it. Because the system handles sensitive user data, I worked closely with the Head of Technology and the Chief Information Security Officer (CISO) on how it was built, secured and changed.",
        "Symetri, part of Addnode Group, builds and delivers design and engineering software for the construction and manufacturing industries. It is an Autodesk Platinum Partner with its own products, including Naviate for BIM workflows in Revit and Civil 3D, and Sovelia for product lifecycle management.",
      ],
      sections: [
        { title: "What I owned", items: ["The codebase of Symetri's internal user-information system", "Web APIs and reusable backend services in C#, .NET and ASP.NET Core", "Data access with Entity Framework", "Technical design and decisions on how the system evolves"] },
        { title: "Working with security leadership", items: ["Close collaboration with the Head of Technology", "Changes to user data handled together with the CISO", "Security and access treated as part of the design, not added afterwards"] },
        { title: "The company", items: ["Design and engineering software for construction and manufacturing", "Autodesk Platinum Partner, part of Addnode Group", "Own products: Naviate (BIM) and Sovelia (product lifecycle)"] },
        { title: "The team", items: ["Common Services: 12 people across product, DevOps and engineering", "Full-time, hybrid, Solna"] },
      ],
      meta: [["Role", "Senior Software Engineer"], ["Type", "Full-time · Hybrid"], ["Period", "Aug – Nov 2026 · 4 mos"], ["Location", "Solna, Stockholm"]],
      tags: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "Web APIs", "Security"],
    },
  },
  {
    banner: { src: "/banners/telia.webp", position: "50% 22%", credit: "Telia HQ, Solna · Photo: Jopparn, CC BY-SA 3.0" },
    name: "Broadband Data Mediation",
    role: "Lead Software Engineer",
    company: "Telia",
    logo: "/logos/telia.svg",
    type: "Telia · Jun 2025 – Aug 2026",
    summary: "Led engineering on the portals and services behind Telia's broadband data mediation: where raw network usage becomes data the business can bill and act on.",
    facts: ["Lead engineer", "Telecom scale", "Kafka · Kubernetes"],
    stack: ["JavaScript", "React", "Node.js", "Elasticsearch", "Kafka", "Kubernetes"],
    story: {
      kicker: "Telia · Lead Software Engineer",
      title: "Broadband Data Mediation",
      body: [
        "Data mediation sits between a telecom network and the systems that run the business. It collects usage records from network equipment, validates and normalises them, and passes them on in a format that billing and other systems can use.",
        "In Telia's Broadband Data Mediation domain I developed and maintained the customer-facing portals and the services behind them. As lead engineer I drove feature development, improved the existing applications and moved them towards scalable, containerised deployments.",
      ],
      sections: [
        { title: "What I led", items: ["Feature development on the customer-facing portals", "Improvements to existing applications and supporting services", "Scalable, containerised deployments running in production"] },
        { title: "What data mediation does", items: ["Collects usage data from network elements", "Validates, filters and normalises it", "Feeds billing and other downstream systems"] },
        { title: "Stack in production", items: ["JavaScript, React and Node.js across the full stack", "Kafka and Elasticsearch / OpenSearch for data flows and search", "Docker, Kubernetes and Grafana to run and observe it"] },
      ],
      meta: [["Role", "Lead Software Engineer"], ["Type", "Full-time · On-site"], ["Period", "Jun 2025 – Aug 2026 · 1 yr 3 mos"], ["Location", "Solna, Stockholm"]],
      tags: ["JavaScript", "React", "Node.js", "Kafka", "Elasticsearch", "OpenSearch", "Docker", "Kubernetes", "Grafana"],
    },
  },
  {
    banner: { src: "/banners/coredination.webp", position: "55% 55%", credit: "The Coredination app in the field · Image: Coredination" },
    name: "Field Service SaaS",
    role: "Software Engineer",
    company: "Coredination",
    logo: "/logos/coredination.svg",
    partner: { logo: "/logos/scania.svg", name: "Scania", note: "Client" },
    type: "Coredination · Oct 2021 – May 2025",
    summary: "Built the cloud platform that runs field work for transport and rental companies, from the work order to the invoice, plus backend integrations for Scania.",
    facts: ["3 yrs 8 mos", "Client: Scania", "AWS · GraphQL"],
    stack: ["AWS Serverless", "React", "GraphQL", "TypeScript", "DevOps"],
    story: {
      kicker: "Coredination · Software Engineer",
      title: "Field Service SaaS",
      body: [
        "Coredination is a cloud-based field service platform that connects the office with the people working in the field: work orders, scheduling, time reporting and documentation, all the way to invoicing. Its customers are mainly in transport, machine rental and service.",
        "For three years and eight months I developed and maintained the platform across backend services, frontend applications and cloud infrastructure, and spent about five months building internal tooling and backend integrations for Scania.",
      ],
      sections: [
        { title: "What I built", items: ["Serverless AWS services: Lambda, DynamoDB and S3", "React applications and GraphQL APIs", "API development and DevOps across the platform"] },
        { title: "Scania (~5 months)", items: ["Internal tooling and backend integrations", "Python and Django services with PostgreSQL and AWS RDS", "REST APIs and Docker-based deployments"] },
        { title: "The product", items: ["Work orders, scheduling and dispatch", "Mobile time reporting and job documentation", "From the field to the invoice in one system"] },
      ],
      meta: [["Role", "Software Engineer"], ["Type", "Contract · On-site"], ["Period", "Oct 2021 – May 2025 · 3 yrs 8 mos"], ["Location", "Sundbyberg, Stockholm"]],
      tags: ["AWS", "Serverless", "React", "TypeScript", "GraphQL", "Node.js", "Python", "Django", "PostgreSQL", "Docker", "DevOps"],
    },
  },
];

export const projects: Work[] = [
  {
    name: "Vornify AI",
    banner: { src: "/banners/vornify.webp", credit: "vornify.se" },
    logo: "/logos/vornify.svg",
    type: "Founder · AI product",
    status: "Live",
    href: "https://vornify.se",
    featured: true,
    summary: "A platform that turns a product idea into a working web app. I built it and run it.",
    stack: ["Next.js", "TypeScript", "LLMs", "Node.js", "Cloud"],
    story: {
      kicker: "Vornify AI · Founder",
      title: "Vornify AI",
      sections: [
        { title: "How it started", items: ["2020–2021: an open-source backend for reusable CRUD and integrations", "Designed to plug into different frontend applications"] },
        { title: "What it is now", items: ["Vornify AI: from a product idea to a working web app", "Live at vornify.se"] },
        { title: "What I own", items: ["Product direction", "Architecture and AI integration", "Infrastructure and operations"] },
      ],
      body: [
        "Vornify started in 2020 as an open-source backend project: reusable CRUD and integration building blocks that let any frontend get a working backend fast.",
        "It has since become Vornify AI, a platform that takes a product idea and generates a working web application on top of that foundation.",
        "I handle product, architecture, AI integration, infrastructure and operations.",
      ],
      meta: [["Role", "Founder & engineer"], ["Since", "2020"], ["Status", "Live at vornify.se"]],
      tags: ["Product", "AI integration", "Architecture", "Operations"],
      link: { label: "Visit vornify.se", href: "https://vornify.se" },
    },
  },
  {
    name: "Clarge",
    banner: { src: "/banners/clarge.webp", credit: "clarge.se" },
    logo: "/logos/clarge.svg",
    type: "Founder · Software studio",
    href: "https://clarge.se",
    summary: "A Stockholm software studio that designs, builds and runs software for companies.",
    stack: ["React", "TypeScript", ".NET", "Python", "AWS"],
    story: {
      kicker: "Clarge · Founder",
      title: "Clarge",
      sections: [
        { title: "How a Clarge engagement runs", items: ["Understand: system context and a first agreed scope", "Plan: milestones, decisions and next actions", "Build: working changes with visible progress", "Continue: documented releases and a clear next step"] },
        { title: "What clients get", items: ["Elias as the direct contact doing the engineering", "A shared delivery record of context and decisions", "Working demos and up-to-date documentation"] },
      ],
      body: [
        "Clarge is the software studio I run in Stockholm. We partner with companies to design, build and run their software.",
        "I work directly with clients on the code and systems, from the first technical decisions to production.",
      ],
      meta: [["Role", "Founder"], ["Since", "Jul 2022"], ["Web", "clarge.se"]],
      tags: ["Client delivery", "Architecture", "Full-stack"],
      link: { label: "Visit clarge.se", href: "https://clarge.se" },
    },
  },
];

export type Role = { logo?: string; mark?: string; company: string; title: string; period: string; place: string; text: string; story?: Story };

export const experience: Role[] = [
  { logo: "/logos/symetri-full.svg", company: "Symetri Europe", title: "Senior Software Engineer", period: "Aug 2026 – Nov 2026", place: "Full-time · Solna · Hybrid", text: "Owned the internal user-information system and its codebase, working with the Head of Technology and the CISO." },
  { logo: "/logos/telia.svg", company: "Telia", title: "Lead Software Engineer", period: "Jun 2025 – Aug 2026", place: "Full-time · Solna · On-site", text: "Led engineering on customer-facing portals and services in Broadband Data Mediation, moving them to scalable, containerised deployments." },
  { logo: "/logos/coredination.svg", company: "Coredination", title: "Software Engineer", period: "Oct 2021 – May 2025", place: "Contract · Sundbyberg · On-site", text: "B2B field service SaaS on serverless AWS, React and GraphQL, including five months of backend integrations for Scania." },
  { logo: "/logos/clarge.svg", company: "Clarge", title: "Founder", period: "Jul 2022 – Present", place: "Stockholm", text: "A software studio that designs, builds and runs software for companies." },
  { logo: "/logos/vornify.svg", company: "Vornify", title: "Founder", period: "Mar 2020 – Jul 2021", place: "Self-employed · Stockholm", text: "Founded an open-source backend for reusable CRUD and integrations, the foundation of today's Vornify AI." },
]

export const stack: [string, string[]][] = [
  ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript"]],
  ["Backend", ["Node.js", "Express", "C# / .NET", "ASP.NET Core", "GraphQL", "REST", "Python", "Django"]],
  ["Data", ["PostgreSQL", "MongoDB", "DynamoDB", "Kafka", "Elasticsearch / ELK"]],
  ["Cloud & Ops", ["AWS", "Lambda", "EC2", "Docker", "Kubernetes", "Grafana", "CI/CD"]],
  ["AI", ["LLM integration", "AI product design", "AI-assisted engineering"]],
];

export type Education = { banner?: Banner; logo?: string; mark: string; school: string; what: string; period: string; text: string; meta: [string, string][]; story: Story };

export const education: Education[] = [
  {
    banner: { src: "/banners/kth.webp", position: "50% 45%", credit: "KTH main building · Photo: Oscar Franzén, public domain" },
    logo: "/logos/kth.svg",
    mark: "KTH",
    school: "KTH Royal Institute of Technology",
    what: "Computer Science · AI & ML focus · Online",
    period: "2022 – 2025",
    text: "A three-year online Computer Science programme focused on AI, machine learning and software engineering, studied alongside my engineering role at Coredination.",
    meta: [["Field", "Computer Science"], ["Focus", "AI & ML software engineering"], ["Format", "Online · 3 years"], ["Period", "Sep 2022 – Jun 2025"]],
    story: {
      kicker: "Studies · KTH",
      title: "KTH Royal Institute of Technology",
      body: [
        "A three-year online Computer Science programme at KTH, focused on AI, machine learning and software engineering.",
        "I studied alongside my engineering role at Coredination. Coredination gave me the chance to work and study at the same time, so the theory from KTH and real production work fed into each other every week.",
      ],
      sections: [
        { title: "Focus", items: ["AI and machine learning", "Software engineering", "Computer science foundations and algorithmic problem-solving"] },
        { title: "Studying while shipping", items: ["Online studies combined with engineering work at Coredination", "What I learned went straight into production systems", "The base for building Vornify AI"] },
      ],
      meta: [["Field", "Computer Science"], ["Focus", "AI & ML"], ["Format", "Online · 3 years"], ["Period", "Sep 2022 – Jun 2025"]],
      tags: ["AI", "Machine learning", "Software engineering", "Algorithms"],
    },
  },
  {
    banner: { src: "/banners/fhs.webp", position: "50% 60%", credit: "Försvarshögskolan, Stockholm · Photo: I99pema, CC BY-SA 3.0" },
    logo: "/logos/fhs.svg",
    mark: "FHS",
    school: "Swedish Defence University",
    what: "Security protection training",
    period: "2025",
    text: "Foundational training in security protection: the responsibilities and principles of Sweden's security protection framework and total defence.",
    meta: [["Course", "Security protection"], ["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"]],
    story: {
      kicker: "Studies · Swedish Defence University",
      title: "Swedish Defence University",
      body: ["Foundational training in security protection: the responsibilities and principles of Sweden's security protection framework and total defence."],
      meta: [["Course", "Security protection"], ["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"]],
    },
  },
];

/* How I work: the delivery approach I use (from my Clarge practice), in four steps. */
export type Step = { n: string; name: string; title: string; text: string; output: string; me: string; team: string };
export const method: Step[] = [
  { n: "01", name: "Understand", title: "Get the context into one place.", text: "I work through the system, priorities and constraints with the people who know them. The codebase, key contacts, existing decisions and open questions go into a shared record, so knowledge gets reused instead of re-explained.", output: "System context and a first agreed scope", me: "System review, focused questions and a shared context record", team: "Business context, system access and key contacts" },
  { n: "02", name: "Plan", title: "Give the work a practical rhythm.", text: "We agree the first milestone, responsibilities and review points. I prepare the technical direction, bring options to discussions and record decisions with owners and next steps. The business decides on priorities and trade-offs.", output: "A plan, a decision record and next actions", me: "Planning, technical recommendations and follow-through", team: "Priorities, business decisions and review times" },
  { n: "03", name: "Build", title: "Keep the work visible as it develops.", text: "I do the engineering, review changes and prepare demos. What changed, what comes next and where input is needed stay visible, so questions and risks surface while there is still time to act on them.", output: "Working software and a clear progress record", me: "Engineering, checks, demos and progress updates", team: "Feedback, answers and acceptance of the work" },
  { n: "04", name: "Continue", title: "Carry the context into the next step.", text: "I review the release against the agreed scope and keep the documentation current. Decisions, setup notes and open work stay accessible, whether I continue with the next priority or hand the work over.", output: "A documented release and a clear next step", me: "Release notes, current documentation and handover", team: "Outcome review and the next priority" },
];

/* Security: how I handle systems and information, and my training. */
export type Security = { name: string; kicker: string; summary: string; logo?: string; image?: string; points?: [string, string][]; meta?: [string, string][]; link?: { label: string; href: string }; story: Story };
export const security: Security[] = [
  {
    name: "Before I touch your systems",
    kicker: "Security · How I work with access and information",
    summary: "Access, information handling and ownership are agreed before I connect to anything, and reviewed as the work goes on.",
    points: [
      ["Access & environments", "Environments, accounts and device requirements are agreed first. I use only the access the work needs, with a clear process for reviewing and removing it."],
      ["Information & tools", "We identify what information can be used, where it can be held and which tools are approved, including for meeting notes and any use of AI or automation."],
      ["Ownership & handover", "Repositories, intellectual property, documentation and release responsibilities are recorded, so the team can understand and continue the work."],
    ],
    story: {
      kicker: "Security · Working practice",
      title: "Before I touch your systems",
      body: [
        "I treat access to code and information as something to agree, not assume. Before connecting to a system, the environments, accounts, tools and boundaries for information are settled, and they stay part of the shared record as the work develops.",
      ],
      sections: [
        { title: "Access & environments", items: ["Environments, accounts and device requirements agreed before connecting", "Only the access the work needs", "A clear process for reviewing and removing access"] },
        { title: "Information & tools", items: ["What information can be used and where it can be held", "Which tools are approved, including AI and automation", "Meeting notes and records follow the same boundaries"] },
        { title: "Ownership & handover", items: ["Repositories and intellectual property recorded up front", "Documentation develops alongside the code", "The team can understand and continue the work"] },
      ],
      tags: ["Least-privilege access", "Approved tooling", "Documented handover"],
    },
  },
  {
    name: "Security protection training",
    kicker: "Security · Försvarshögskolan & MSB",
    summary: "Completed Grundläggande säkerhetsskyddsutbildning on 20 June 2025: security protection within Sweden's crisis preparedness and total defence.",
    logo: "/logos/fhs.svg",
    image: "/credentials/security-protection-training.webp",
    meta: [["Course", "Grundläggande säkerhetsskyddsutbildning"], ["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"]],
    link: { label: "Full-size PDF", href: "/credentials/security-protection-training.pdf" },
    story: {
      kicker: "Security · Training",
      title: "Security protection training",
      body: [
        "On 20 June 2025 I completed Grundläggande säkerhetsskyddsutbildning, the introductory security protection training for people with assignments within Sweden's crisis preparedness and total defence. The participation certificate bears the names of Försvarshögskolan (Swedish Defence University) and MSB.",
      ],
      sections: [
        { title: "What the training covers", items: ["The security protection requirements that apply", "Personal responsibility in the work for Sweden's security", "Responsibility in security protection work", "Practical ways to contribute to and maintain security protection"] },
      ],
      meta: [["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"], ["Format", "Participation certificate"]],
      link: { label: "View certificate (PDF)", href: "/credentials/security-protection-training.pdf" },
    },
  },
];

/* The short version, for the person deciding. */
export const pitch: [string, string][] = [
  ["5+ years in production", "Telecom, construction tech and B2B SaaS at Symetri, Telia and Coredination, including client work for Scania."],
  ["Founder experience", "I built and run Vornify AI and founded Clarge, so I own work from the first idea to production."],
  ["Security-trained", "Security protection training from Försvarshögskolan and MSB, and a clear practice for access and information."],
  ["Available now", "Ready to start immediately. Stockholm: hybrid, on-site or remote."],
];

/* What I'm looking for next: the roles, why, and the evidence behind each. */
export type NextRole = { role: string; kicker: string; why: string; proof: [string, string][]; fit: string };
export const nextRoles: NextRole[] = [
  {
    role: "Senior Engineer",
    kicker: "Next · Role 1 of 3",
    why: "I've spent more than five years shipping production systems. The next step is owning bigger parts of a system end to end, setting technical direction and raising the bar for the people around me.",
    proof: [
      ["Telia", "Lead Software Engineer on broadband data mediation portals"],
      ["Symetri", "Owned a security-critical user-information system with the CISO"],
      ["Coredination", "3 yrs 8 mos across frontend, backend and serverless AWS"],
    ],
    fit: "Teams with production systems at scale, where ownership is expected.",
  },
  {
    role: "Product Engineer",
    kicker: "Next · Role 2 of 3",
    why: "I do my best work close to the product and the people using it. Building Vornify taught me to own the whole loop: the problem, the build, the launch and what users do afterwards.",
    proof: [
      ["Vornify AI", "Took a product from idea to live, and run it"],
      ["Telia", "Customer-facing features people rely on every day"],
      ["Coredination", "B2B SaaS for real operational work in the field"],
    ],
    fit: "Product teams where engineers shape what gets built, not just how.",
  },
  {
    role: "Founding Engineer",
    kicker: "Next · Role 3 of 3",
    why: "I've started things from nothing twice. I know the pace, the trade-offs and the responsibility of an early team, and I want to bring that to a startup that is moving fast.",
    proof: [
      ["Vornify", "From open-source backend to a live AI product"],
      ["Clarge", "Founded and run a software studio since 2022"],
      ["Scrapathon", "24 hours from idea to pitch with Antler × SSE Business Lab"],
    ],
    fit: "Early, fast-growing teams that ship weekly and talk to users.",
  },
];

export const nextTeam = {
  title: "Where I'll do my best work",
  points: [
    ["Fast-growing startups", "Small teams with clear goals, real ownership and short paths from idea to production."],
    ["Big tech", "Teams that care about engineering quality and systems used by a lot of people."],
    ["Stockholm or remote", "Hybrid, on-site or fully remote, from the first week."],
  ] as [string, string][],
};
