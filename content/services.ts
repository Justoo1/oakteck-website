/** The seven services from docs/BRIEF.md section 4. */

export type ServiceIcon = "layers" | "smartphone" | "boxes" | "wallet" | "sparkles" | "cloud" | "pen-tool";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIcon;
  problem: string;
  build: string[];
  stack: string[];
  example: { label: string; href: string; text: string };
};

export const services: Service[] = [
  {
    slug: "custom-software",
    title: "Custom software and SaaS",
    short: "Web platforms built for how your business actually runs, multi-tenant when needed.",
    icon: "layers",
    problem:
      "Off-the-shelf software makes you work its way. Spreadsheets and WhatsApp groups stop scaling once you have more than one branch.",
    build: [
      "Web platforms shaped around your real workflow",
      "Multi-tenant SaaS, with each customer's data kept separate in the database",
      "Dashboards and reports for owners and managers",
    ],
    stack: ["Python (FastAPI, Django)", "Next.js", "PostgreSQL", "Redis"],
    example: {
      label: "Kwanix",
      href: "/products/kwanix",
      text: "A multi-tenant SaaS for inter-city bus companies, with data isolation enforced in PostgreSQL.",
    },
  },
  {
    slug: "web-mobile",
    title: "Web and mobile apps",
    short: "Next.js web apps, React Native and PWA mobile apps, offline-first where the network is unreliable.",
    icon: "smartphone",
    problem:
      "Your staff and customers are on phones, often on patchy mobile data. Apps that freeze without a connection lose sales and records.",
    build: [
      "Fast Next.js and React web apps",
      "React Native and installable PWA mobile apps",
      "Offline-first apps that sync when the connection returns",
    ],
    stack: ["Next.js", "React", "React Native", "PWA", "TypeScript"],
    example: {
      label: "Nkabom",
      href: "/products/nkabom",
      text: "An offline-first PWA for daycares that works on unreliable connections and needs no app store.",
    },
  },
  {
    slug: "erp-odoo",
    title: "ERP and Odoo",
    short: "Implementation, custom modules and integration with the systems you already use.",
    icon: "boxes",
    problem:
      "Stock, payroll and approvals live in different places, so nobody trusts the numbers and audits take weeks.",
    build: [
      "Odoo implementation and configuration",
      "Custom modules: inventory, payroll, audit trails, org charts",
      "Integration with your existing systems",
    ],
    stack: ["Odoo", "Python", "PostgreSQL"],
    example: {
      label: "GMAK Properties",
      href: "/work/gmak-properties",
      text: "A real-estate site with an Odoo backend for leads, contracts and properties (founder's project).",
    },
  },
  {
    slug: "payments-integrations",
    title: "Payments, SMS and integrations",
    short: "Mobile Money and card payments, SMS, WhatsApp notifications and store-to-ERP sync.",
    icon: "wallet",
    problem:
      "Customers want to pay with Mobile Money and hear back by SMS. Online orders that don't reach your ERP mean overselling and manual re-entry.",
    build: [
      "Mobile Money and card payments with Paystack",
      "SMS with Arkesel, and WhatsApp notifications",
      "Shopify or WooCommerce to ERP sync",
    ],
    stack: ["Paystack", "Arkesel", "WhatsApp", "Shopify", "WooCommerce", "Celery and Redis"],
    example: {
      label: "MCEES Engine",
      href: "/work/mcees-engine",
      text: "Async middleware that syncs Shopify and WooCommerce into Odoo, with Redis locks to prevent overselling (founder's project).",
    },
  },
  {
    slug: "ai",
    title: "AI for business",
    short: "Question-answering over your documents, data extraction and automation. On-premise when data must stay in-house.",
    icon: "sparkles",
    problem:
      "Your team spends hours searching documents and copying data between systems. Sensitive records can't be sent to just any cloud service.",
    build: [
      "Document question-answering (RAG) over your own files",
      "Data extraction and workflow automation",
      "On-premise models so sensitive data stays in-house",
    ],
    stack: ["Python", "LangChain", "OpenAI API", "On-premise LLMs"],
    example: {
      label: "AI CV optimiser",
      href: "/work/ai-cv-optimiser",
      text: "Upload a CV and a job description; AI returns specific improvements (founder's project).",
    },
  },
  {
    slug: "cloud-devops",
    title: "Cloud, DevOps and modernisation",
    short: "Monoliths to microservices, CI/CD, Docker and Kubernetes, AWS and uptime monitoring.",
    icon: "cloud",
    problem:
      "Releases are risky, the old system is slow to change, and you find out about downtime from your customers.",
    build: [
      "Moving monoliths to microservices",
      "CI/CD pipelines for safe, repeatable releases",
      "Docker and Kubernetes on AWS, with uptime monitoring",
    ],
    stack: ["Docker", "Kubernetes", "AWS", "CI/CD", "Monitoring"],
    example: {
      label: "WASSCE Analytics",
      href: "/products/wassce-analytics",
      text: "A parsing service with Celery workers, Redis and S3-compatible storage, with each school isolated in its own schema.",
    },
  },
  {
    slug: "design",
    title: "Product and UI/UX design",
    short: "Brand identity, design systems and mobile app UI kits.",
    icon: "pen-tool",
    problem:
      "A product that is hard to use doesn't get used, especially by first-time smartphone users.",
    build: ["Brand identity", "Design systems", "Mobile app UI kits"],
    stack: ["Brand identity", "Design systems", "UI kits"],
    example: {
      label: "FlexiFund",
      href: "/products/flexifund",
      text: "Brand identity and a mobile app UI kit for underbanked savers: onboarding, savings goals and loan applications.",
    },
  },
];

export const sectors = [
  { label: "Transport and logistics", icon: "bus" },
  { label: "Schools and daycares", icon: "school" },
  { label: "Credit unions and microfinance", icon: "landmark" },
  { label: "Real estate", icon: "building" },
  { label: "Retail and e-commerce", icon: "shopping-bag" },
  { label: "Regulated industries such as pharma", icon: "pill" },
] as const;
