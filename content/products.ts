/**
 * Oakteck's own products. Facts come only from docs/BRIEF.md section 5.
 * Anything missing is a visible [PLACEHOLDER] listed in OWNER-TODO.md.
 */

export type ProductStatus = "live" | "in-development";

export type SectorIcon = "bus" | "baby" | "piggy-bank" | "graduation-cap" | "sprout";

export type ProductFeature = {
  title: string;
  body: string;
  /** Screenshot from the product, or an abstract illustration key when none was supplied. */
  visual: { kind: "image"; src: string; alt: string } | { kind: "illustration"; name: string };
};

export type Product = {
  slug: "kwanix" | "nkabom" | "flexifund" | "wassce-analytics" | "agriconnect";
  name: string;
  category: string;
  oneLine: string;
  status: ProductStatus;
  statusNote?: string;
  icon: SectorIcon;
  problem: { heading: string; body: string };
  features: ProductFeature[];
  audience: string[];
  stack: string[];
  cta: { label: string; href: string };
  links: { label: string; href: string }[];
};

const contactFor = (product: string, intent: string) =>
  `/contact?product=${encodeURIComponent(product)}&intent=${encodeURIComponent(intent)}`;

export const products: Product[] = [
  {
    slug: "kwanix",
    name: "Kwanix",
    category: "Transport ticketing and parcel logistics",
    oneLine: "Tickets, parcels and live fleet tracking for inter-city bus companies.",
    status: "live",
    icon: "bus",
    problem: {
      heading: "Every ticket and parcel, accounted for before the last bus leaves.",
      body: "Inter-city bus companies sell tickets at busy counters, take parcels for dozens of towns and send buses out all day. When that runs on cash and paper, owners close the day guessing what was collected, and a parcel loaded onto the wrong bus becomes a lost customer. Kwanix puts sales, parcels and the fleet in one system, for every station.",
    },
    features: [
      {
        title: "Counter and online ticket sales",
        body: "Sell seats from a visual seat map at the counter or online. Passengers pay in cash or with Mobile Money.",
        visual: { kind: "image", src: "/images/kwanix/counter-sale.webp", alt: "Kwanix counter screen selling a ticket from a visual seat map" },
      },
      {
        title: "Parcels with QR labels and SMS updates",
        body: "Log a parcel in seconds. It gets a QR label, and the sender and receiver get SMS updates as it moves.",
        visual: { kind: "image", src: "/images/kwanix/parcel-log.webp", alt: "Kwanix form for logging a new parcel with sender, receiver and destination" },
      },
      {
        title: "Scan-to-load protection",
        body: "Loaders scan every parcel onto the bus. A parcel cannot board a bus going to the wrong town; the scanner blocks it on the spot.",
        visual: { kind: "image", src: "/images/kwanix/wrong-bus.webp", alt: "Kwanix scanner showing a red WRONG BUS warning for a parcel going to another town" },
      },
      {
        title: "OTP-verified pickup",
        body: "The receiver shows a one-time code sent by SMS, so a parcel is only released to the right person, with a full audit trail.",
        visual: { kind: "image", src: "/images/kwanix/otp-pickup.webp", alt: "Kwanix parcel release screen asking for the receiver's one-time code" },
      },
      {
        title: "Live GPS fleet map and passenger tracking",
        body: "See every bus on a live map. Passengers and parcel senders follow their journey and get SMS reminders.",
        visual: { kind: "image", src: "/images/kwanix/tracking.webp", alt: "Kwanix public parcel tracker with a map and journey steps" },
      },
      {
        title: "Revenue, manifests and demand intelligence",
        body: "Revenue per trip and per route, branded PDF manifests, and demand intelligence with pricing suggestions.",
        visual: { kind: "image", src: "/images/kwanix/owner-dashboard.webp", alt: "Kwanix owner dashboard with trip and revenue figures" },
      },
    ],
    audience: [
      "Inter-city bus and transport companies",
      "Station managers and counter staff",
      "Parcel desks and loaders",
      "Passengers and parcel senders",
    ],
    stack: ["FastAPI", "PostgreSQL with row-level security", "Next.js", "Mobile Money", "SMS"],
    cta: { label: "Request a demo", href: contactFor("Kwanix", "demo") },
    links: [{ label: "Visit kwanix.com", href: "https://kwanix.com" }],
  },
  {
    slug: "nkabom",
    name: "Nkabom",
    category: "Daycare management",
    oneLine: "Fees, attendance and parent messaging for daycares and creches, even offline.",
    status: "in-development",
    icon: "baby",
    problem: {
      heading: "Run your daycare from a phone, even when the network drops.",
      body: "Daycare centres and creches juggle fee payments, daily attendance and a steady stream of parent questions, often on unreliable connections. Nkabom brings them into one app that keeps working offline and needs no app store.",
    },
    features: [
      {
        title: "Offline-first PWA",
        body: "Works on unreliable connections and syncs when the network returns. Installs from the browser, with no app store.",
        visual: { kind: "illustration", name: "offline" },
      },
      {
        title: "Mobile Money fee payments",
        body: "Parents pay fees with Mobile Money, and the centre sees who has paid.",
        visual: { kind: "illustration", name: "payments" },
      },
      {
        title: "Attendance tracking",
        body: "Record drop-offs and pick-ups each day.",
        visual: { kind: "illustration", name: "attendance" },
      },
      {
        title: "Parent-teacher messaging and progress reports",
        body: "Message parents directly and share each child's progress reports.",
        visual: { kind: "illustration", name: "messages" },
      },
    ],
    audience: ["Daycare centres", "Creches", "Teachers and carers", "Parents"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "PWA"],
    cta: { label: "Join the pilot", href: contactFor("Nkabom", "pilot") },
    links: [{ label: "Code on GitHub", href: "https://github.com/Justoo1/daycare-management-system" }],
  },
  {
    slug: "flexifund",
    name: "FlexiFund",
    category: "Credit union and cooperative savings",
    oneLine: "Members, savings, susu and loans for credit unions and savings groups.",
    status: "live",
    statusNote: "Live at BCSE",
    icon: "piggy-bank",
    problem: {
      heading: "Members see their balances. Month-end reports take minutes.",
      body: "Credit unions and cooperative savings schemes track members, susu collections, fixed deposits and loans, often across ledgers and spreadsheets. FlexiFund keeps every account and transaction in one system and sends members SMS updates.",
    },
    features: [
      {
        title: "Member registration",
        body: "Register members and keep their records and accounts in one place.",
        visual: { kind: "illustration", name: "members" },
      },
      {
        title: "Savings, susu and fixed deposits",
        body: "Run savings, susu and fixed-deposit accounts side by side.",
        visual: { kind: "illustration", name: "savings" },
      },
      {
        title: "Transactions and SMS notifications",
        body: "Process member transactions and notify members by SMS.",
        visual: { kind: "illustration", name: "payments" },
      },
      {
        title: "Financial reports",
        body: "Produce financial reports without rebuilding spreadsheets.",
        visual: { kind: "illustration", name: "reports" },
      },
      {
        title: "Brand identity and mobile app UI kit",
        body: "FlexiFund has its own brand identity and a mobile app UI kit aimed at underbanked consumers: onboarding, account dashboard, savings goals and loan applications.",
        visual: { kind: "illustration", name: "mobile" },
      },
    ],
    audience: ["Credit unions", "Cooperative savings schemes", "Susu and savings enterprises", "Microfinance teams"],
    stack: ["Python", "PostgreSQL", "SMS"],
    cta: { label: "Request a demo", href: contactFor("FlexiFund", "demo") },
    links: [
      { label: "Try the demo", href: "https://flexifund.edtmsys.com" },
      { label: "See it live at BCSE", href: "https://bcse.edtmsys.com" },
    ],
  },
  {
    slug: "wassce-analytics",
    name: "WASSCE Analytics",
    category: "Results intelligence for senior high schools",
    oneLine: "Upload WASSCE results and see grades, subjects and university qualification the same day.",
    status: "live",
    icon: "graduation-cap",
    problem: {
      heading: "Your WASSCE results, understood the day they arrive.",
      body: "Every year, senior high schools rebuild their WAEC results in spreadsheets to see how students and subjects performed and who qualifies for university. WASSCE Analytics reads the results files for you and turns them into dashboards.",
    },
    features: [
      {
        title: "Upload results as PDF or Excel",
        body: "Each school uploads its WAEC (WASSCE) results, and the platform parses them automatically.",
        visual: { kind: "illustration", name: "upload" },
      },
      {
        title: "Grades and subject performance",
        body: "Dashboards show grade distributions, subject performance and year-on-year comparisons.",
        visual: { kind: "illustration", name: "reports" },
      },
      {
        title: "University qualification tracking",
        body: "See, per student, who meets university entry requirements.",
        visual: { kind: "illustration", name: "qualification" },
      },
      {
        title: "Your own subdomain, your own data",
        body: "Each school gets its own subdomain, and its data is kept separate from every other school's.",
        visual: { kind: "illustration", name: "isolation" },
      },
    ],
    audience: ["Senior high schools", "Headteachers", "Assistant Headmasters (Academics)", "Exams and data officers"],
    stack: ["Next.js", "FastAPI parsing service", "Celery workers", "PostgreSQL (schema per school)", "Redis", "S3-compatible storage"],
    cta: { label: "Book a demo for your school", href: contactFor("WASSCE Analytics", "demo") },
    links: [{ label: "School sign-in", href: "https://wassceanalytics.ghsch.com" }],
  },
  {
    slug: "agriconnect",
    name: "AgriConnect",
    category: "Ghana's agricultural value chain on one platform",
    oneLine: "Land, equipment, storage, transport and buyers for farmers, on one platform.",
    status: "in-development",
    statusNote: "Foundation phase complete",
    icon: "sprout",
    problem: {
      heading: "From land to market, every step of the farming cycle on one platform.",
      body: "A farming cycle depends on many people: landowners, mechanics, drivers, warehouse owners, buyers, extension officers and government. AgriConnect connects farmers, landowners, investors, mechanics, transport drivers, warehouse owners, B2B buyers, Agric Extension Officers, District Chief Executives and the Ministry of Food and Agriculture.",
    },
    features: [
      {
        title: "Land",
        body: "List, search and secure land by lease, purchase or work-and-pay.",
        visual: { kind: "illustration", name: "land" },
      },
      {
        title: "Equipment",
        body: "Hire equipment and dispatch repairs, with escalation when repairs run late.",
        visual: { kind: "illustration", name: "equipment" },
      },
      {
        title: "Warehousing and B2B marketplace",
        body: "Match produce to storage, including government-subsidised approval chains, then sell stored produce to buyers.",
        visual: { kind: "illustration", name: "warehouse" },
      },
      {
        title: "Transport",
        body: "On-demand freight dispatch with live GPS tracking.",
        visual: { kind: "illustration", name: "transport" },
      },
      {
        title: "Sponsorship built in",
        body: "Independent, government-sponsored and investor-sponsored farming cycles each get the right approvals, payment rail and visibility.",
        visual: { kind: "illustration", name: "sponsorship" },
      },
      {
        title: "Mobile app, web portal and USSD",
        body: "A Flutter mobile app with offline sync, a web portal, and USSD menus for feature phones. Integrates Mobile Money (Paystack), Arkesel SMS, OTP and USSD, Ghana Card verification and Ghana.GOV payments.",
        visual: { kind: "illustration", name: "channels" },
      },
    ],
    audience: [
      "Farmers and landowners",
      "Investors and sponsors",
      "Mechanics, drivers and warehouse owners",
      "B2B buyers",
      "Agric Extension Officers and District Chief Executives",
      "Ministry of Food and Agriculture",
    ],
    stack: ["FastAPI modular monolith", "PostgreSQL + PostGIS", "Redis / Celery", "Next.js", "Flutter"],
    cta: { label: "Partner with us", href: contactFor("AgriConnect", "partner") },
    links: [],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const statusLabel: Record<ProductStatus, string> = {
  live: "Live",
  "in-development": "In development",
};
