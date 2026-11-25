export type Story = {
  kicker: string;
  title: string;
  body: string[];
  meta?: [string, string][];
  tags?: string[];
  link?: { label: string; href: string };
  sections?: { title: string; items: string[] }[];
  figure?: { src: string; alt: string; label: string; title: string; text: string; href?: string };
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
  cv: "/cv/Elias-Luzwehimana-CV.pdf",
  coverLetter: "/cv/Elias-Luzwehimana-Cover-Letter.pdf",
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
        "Alongside that I founded and ran Clarge, a small software studio, until November 2026, and built Vornify AI, a product I operate.",
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
    logo: "/logos/symetri-icon.svg",
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
    logo: "/logos/telia-icon.png",
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
    logo: "/logos/coredination-icon.svg",
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
    name: "Clarge",
    banner: { src: "/banners/clarge.webp", credit: "clarge.se" },
    logo: "/logos/clarge.svg",
    type: "Founder · Software studio",
    facts: ["Founder", "Client delivery", "Full-stack"],
    href: "https://clarge.se",
    summary: "A Stockholm software studio I founded and ran from 2022 to 2026. It designed, built and ran software for companies.",
    stack: ["React", "TypeScript", ".NET", "Python", "AWS"],
    story: {
      kicker: "Clarge · Founder",
      title: "Clarge",
      sections: [
        { title: "How a Clarge engagement ran", items: ["Understand: system context and a first agreed scope", "Plan: milestones, decisions and next actions", "Build: working changes with visible progress", "Continue: documented releases and a clear next step"] },
        { title: "What clients got", items: ["Elias as the direct contact doing the engineering", "A shared delivery record of context and decisions", "Working demos and up-to-date documentation"] },
      ],
      body: [
        "Clarge is the software studio I founded and ran in Stockholm from July 2022 to November 2026. We partnered with companies to design, build and run their software.",
        "I worked directly with clients on the code and systems, from the first technical decisions to production.",
      ],
      meta: [["Role", "Founder"], ["Period", "Jul 2022 – Nov 2026"], ["Web", "clarge.se"]],
      tags: ["Client delivery", "Architecture", "Full-stack"],
      link: { label: "Visit clarge.se", href: "https://clarge.se" },
    },
  },
  {
    name: "Vornify AI",
    banner: { src: "/banners/vornify.webp", credit: "vornify.se" },
    logo: "/logos/vornify.svg",
    type: "Founder · AI product",
    facts: ["Founder", "AI product", "Built and run by me"],
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
];

export type Role = { logo?: string; mark?: string; company: string; title: string; period: string; place: string; text: string; story?: Story };

export const experience: Role[] = [
  { logo: "/logos/symetri-icon.svg", company: "Symetri Europe", title: "Senior Software Engineer", period: "Aug 2026 – Nov 2026", place: "Full-time · Solna · Hybrid", text: "Owned the internal user-information system and its codebase, working with the Head of Technology and the CISO." },
  { logo: "/logos/telia-icon.png", company: "Telia", title: "Lead Software Engineer", period: "Jun 2025 – Aug 2026", place: "Full-time · Solna · On-site", text: "Led engineering on customer-facing portals and services in Broadband Data Mediation, moving them to scalable, containerised deployments." },
  { logo: "/logos/coredination-icon.svg", company: "Coredination", title: "Software Engineer", period: "Oct 2021 – May 2025", place: "Contract · Sundbyberg · On-site", text: "B2B field service SaaS on serverless AWS, React and GraphQL, including five months of backend integrations for Scania." },
  { logo: "/logos/clarge.svg", company: "Clarge", title: "Founder", period: "Jul 2022 – Nov 2026", place: "Stockholm", text: "A software studio that designed, built and ran software for companies." },
  { logo: "/logos/vornify.svg", company: "Vornify", title: "Founder", period: "Mar 2020 – Jul 2021", place: "Self-employed · Stockholm", text: "Founded an open-source backend for reusable CRUD and integrations, the foundation of today's Vornify AI." },
]

export type Level = "Advanced" | "Intermediate";
export const stack: [string, [string, Level][]][] = [
  ["Frontend", [["React.js & Next.js", "Advanced"], ["TypeScript / JavaScript", "Advanced"], ["Tailwind CSS", "Advanced"], ["HTML5 & CSS3", "Advanced"], ["Responsive design", "Advanced"], ["Figma (UI/UX)", "Advanced"]]],
  ["Backend", [["Node.js / Express.js", "Advanced"], ["Python / Django / FastAPI", "Advanced"], ["GraphQL", "Advanced"], ["REST API design", "Advanced"], ["C# / .NET Core", "Advanced"], ["Java / Spring Boot", "Intermediate"], ["Apache Kafka", "Intermediate"]]],
  ["Cloud & data", [["AWS (Lambda, S3, RDS, EC2)", "Intermediate"], ["PostgreSQL / MongoDB", "Advanced"], ["Elasticsearch / OpenSearch", "Intermediate"], ["Firebase", "Advanced"], ["Grafana", "Advanced"], ["TensorFlow / OpenAI APIs", "Advanced"]]],
  ["DevOps", [["Docker & Kubernetes", "Advanced"], ["CI/CD pipelines", "Advanced"], ["Git & GitHub", "Advanced"], ["JFrog", "Advanced"], ["SSH & PowerShell", "Advanced"]]],
  ["Infrastructure as code", [["Terraform", "Intermediate"], ["AWS CloudFormation", "Intermediate"], ["Cloud resource provisioning", "Intermediate"], ["State management", "Advanced"]]],
  ["AI & soft skills", [["AI/ML integration", "Advanced"], ["Prompt engineering", "Advanced"], ["Team leadership", "Advanced"], ["Agile / Scrum", "Advanced"], ["System architecture", "Advanced"], ["Client relations", "Advanced"]]],
];

/* AI: how I use it, and why I can be trusted with it. */
export type AiPage = { name: string; kicker: string; title: string; lead: string; stat?: [string, string]; label: string; points: [string, string][] };
export const ai: AiPage[] = [
  {
    name: "Daily work",
    kicker: "AI · In my daily work",
    title: "AI is part of how I work, every day.",
    lead: "I know Python, JavaScript and Java in depth. On that base, AI lets me get productive in a new language or stack fast. Put me in a C++ codebase I have never seen, and within a few weeks I am comfortable building and running it.",
    label: "What that means for a team",
    points: [
      ["Three languages in depth", "Python, JavaScript and Java are where I think without help."],
      ["Almost any stack", "The fundamentals carry over. AI closes the gap in syntax and tooling, so the stack is rarely what holds me back."],
      ["Built on it, too", "Vornify AI is my own product, and my Computer Science studies at KTH focused on AI and machine learning."],
    ],
  },
  {
    name: "Judgment",
    kicker: "AI · Judgment",
    title: "AI writes fast. I decide what ships.",
    lead: "At Telia I managed more than a billion data records from Swedish infrastructure. At that scale a small mistake is expensive, so I look at everything with a second eye, including what AI produces.",
    stat: ["1B+", "data records managed at Telia"],
    label: "What I check before it ships",
    points: [
      ["Does it hold?", "Under real load and real data, not only in the demo."],
      ["Is it safe?", "I am trained in security protection and used to highly sensitive data."],
      ["Can the team run it?", "Readable, tested and documented, so it does not depend on me."],
    ],
  },
];


export type Education = { banner?: Banner; facts?: string[]; logo?: string; mark: string; school: string; what: string; period: string; text: string; meta: [string, string][]; story: Story };

export const education: Education[] = [
  {
    banner: { src: "/banners/kth.webp", position: "50% 45%", credit: "KTH main building · Photo: Oscar Franzén, public domain" },
    logo: "/logos/kth.svg",
    mark: "KTH",
    school: "KTH Royal Institute of Technology",
    what: "Computer Science · AI & ML focus · Online",
    period: "2022 – 2025",
    facts: ["3 years", "AI & ML focus", "Online"],
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
    facts: ["Certificate · 20 June 2025", "Försvarshögskolan & MSB"],
    text: "Security protection training, taken so I could work with highly sensitive data at Telia, where the customers included Swedish government agencies.",
    meta: [["Course", "Security protection"], ["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"]],
    story: {
      kicker: "Studies · Swedish Defence University",
      title: "Swedish Defence University",
      body: [
        "On 20 June 2025 I completed Grundläggande säkerhetsskyddsutbildning, the foundational security protection training from Försvarshögskolan and MSB.",
        "I took it to be able to work with highly sensitive data at Telia. Our customers there included Swedish government agencies such as Polismyndigheten, Skatteverket and Migrationsverket.",
      ],
      figure: {
        src: "/credentials/security-protection-training.webp",
        alt: "Participation certificate: Grundläggande säkerhetsskyddsutbildning, Elias Luzwehimana, 20 June 2025, Försvarshögskolan and MSB",
        label: "The certificate",
        title: "Grundläggande säkerhetsskyddsutbildning",
        text: "Participation certificate issued to Elias Luzwehimana on 20 June 2025 by Försvarshögskolan (Swedish Defence University) and MSB.",
        href: "/credentials/security-protection-training.pdf",
      },
      sections: [
        { title: "Why I took it", items: ["To work with highly sensitive data at Telia", "Government customers such as Polismyndigheten, Skatteverket and Migrationsverket", "Completed the same month I started at Telia"] },
        { title: "What the training covers", items: ["The security protection requirements that apply", "Personal responsibility in the work for Sweden's security", "Responsibility in security protection work", "Practical ways to contribute to and maintain security protection"] },
      ],
      meta: [["Course", "Security protection"], ["Completed", "20 June 2025"], ["Issued by", "Försvarshögskolan & MSB"], ["Taken for", "Telia"]],
    },
  },
];

/* How I work with a team: from understanding the problem to getting it shipped. */
export type Step = { n: string; name: string; title: string; text: string; output: string; me: string; team: string };
export const method: Step[] = [
  { n: "01", name: "Understand", title: "Start with the problem, not the ticket.", text: "I ask a lot of questions. Before I write code I talk to the people who know the system and its users, and write down what we know, what we don't and what a good result looks like.", output: "A shared picture of the problem", me: "Questions, a read of the codebase and a written summary", team: "Context, history and the right people to talk to" },
  { n: "02", name: "Decide", title: "Decide in the open.", text: "I bring options with their trade-offs, say which one I would pick and why, and then listen. I test each option against load, security and who will maintain it. Once we decide, it is written down with an owner.", output: "A decision everyone can explain", me: "Options, a recommendation and the trade-offs", team: "Priorities, challenge and the final call" },
  { n: "03", name: "Build", title: "Keep the work visible.", text: "I ship in small steps, show working software early and say so when something is off. Nobody should have to ask where things stand.", output: "Working software, shown early", me: "Engineering, reviews and demos", team: "Feedback while it is still cheap to change" },
  { n: "04", name: "Ship", title: "Finish properly.", text: "Done means in production, monitored and documented, so the next person can pick it up without me in the room.", output: "A release the team can run", me: "Release, monitoring and documentation", team: "A review of the outcome and the next priority" },
];

/* About me: what drives me, and what I do outside work. */
export const about = {
  kicker: "About me",
  title: "Curious, and at my best in a team.",
  lead: "Curiosity is what drives me. I like being part of a team that solves problems together, where what I say matters and I listen just as closely to everyone else.",
  label: "Outside work",
  points: [
    ["Running", "With my running club, around Djurgården."],
    ["Cycling", "Out on the bike when the weather is clear."],
    ["Tech events", "I go to the tech events I find interesting."],
  ] as [string, string][],
};

/* The short version, for the person deciding. */
export const pitch: [string, string][] = [
  ["5+ years in production", "Telecom, construction tech and B2B SaaS at Symetri, Telia and Coredination, including client work for Scania."],
  ["Founder experience", "I built and run Vornify AI and founded Clarge, so I own work from the first idea to production."],
  ["Security-trained", "Security protection training from Försvarshögskolan and MSB, taken for work with highly sensitive data at Telia."],
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
      ["Clarge", "Founded and ran a software studio, 2022 to 2026"],
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
