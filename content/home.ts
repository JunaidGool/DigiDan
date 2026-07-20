/**
 * Approved site copy (spec v1.0, section 6.3). Use verbatim.
 * British English, no em dashes. Jargon lives in bullet lists only.
 *
 * Contact method is an open decision (spec 9). Until confirmed, the primary
 * actions point at a domain mailbox rather than publishing a phone number.
 */

export const CONTACT_HREF = "mailto:hello@digidan.co.za";

export const site = {
  name: "DigiDan",
  legalName: "DigiDan (Pty) Ltd",
  url: "https://digidan.co.za",
  domain: "digidan.co.za",
  location: "South Africa",
  description:
    "DigiDan is a South African software engineering and digital solutions company. We build custom software, e-commerce platforms, systems integration and production-grade AI, designed for dependable real-world operation.",
  wordmark: "d g d n",
  email: "hello@digidan.co.za",
} as const;

export const nav = [
  { label: "What we do", href: "/#services" },
  { label: "Company", href: "/#overview" },
] as const;

export const hero = {
  eyebrow: "CUSTOM SOFTWARE, PLATFORMS AND AI",
  legal: "DIGIDAN (PTY) LTD",
  h1: "Software strong enough to depend on.",
  tagline: "Built for the real world.",
  paragraph:
    "Tell us the problem. We build the custom software and automation to solve it, and we make it hold up in the real world, not just in a demo.",
  primary: "Start a project",
  secondary: "See what we can do",
  cubeCaption: "A LIVE SYSTEM, ASSEMBLING",
} as const;

/**
 * Services, reframed around what a customer gets. Each renders as a full-width
 * row (benefit copy on one side, a live graphic on the other), and the set is
 * the centre of the home page. `graphic` selects the animated panel component.
 */
export const services = {
  label: "WHAT WE CAN DO FOR YOU",
  title: "How we make your business better.",
  intro:
    "The questions we answer for businesses like yours. Tell us which one is keeping you up, and we will build the system that settles it.",
  items: [
    {
      id: "fintech",
      graphic: "fintech",
      kicker: "FINANCIAL-GRADE ENGINEERING",
      title: "Financial-grade engineering, when your systems need it.",
      body: "Some of our engineers have spent years building financial and self-service banking systems. When your software needs that level of rigour, we bring it: transaction integrity, auditability and resilience. We are a software engineering partner, not a bank.",
      bullets: [
        "Transaction integrity: processed once, reconcilable and auditable",
        "Resilience and controlled recovery designed in from the start",
        "Security-conscious engineering aligned to recognised standards",
      ],
      note: "We deliver engineering services. We are not a bank or a licensed financial provider.",
    },
    {
      id: "platforms",
      graphic: "platforms",
      kicker: "MODERNISE WHAT YOU RUN ON",
      title: "Custom software and online stores that grow with you.",
      body: "A new product built, an online store that sells, or a tired legacy system brought up to date, all connected to the tools you already use.",
      bullets: [
        "Custom software built for your business, not off the shelf",
        "Online stores on nopCommerce, set up and extended",
        "Your systems talking to each other cleanly",
        "Legacy systems modernised without stopping the business",
      ],
    },
    {
      id: "ai",
      graphic: "ai",
      kicker: "AUTOMATE THE SLOW WORK",
      title: "Automate the repetitive work, safely.",
      body: "We put AI to work on the tasks that slow your team down, with clear rules, proper testing and a person in control of anything that touches money or records.",
      bullets: [
        "Free your team from repetitive processes",
        "Every AI output checked before it is used",
        "Costs capped, with no runaway bills",
        "A person approves anything that matters",
      ],
    },
  ],
} as const;

export const statement = {
  label: "WHAT WE DO",
  // The first sentence is rendered bold.
  lead: "We connect the whole system.",
  rest: "From the business tools your team uses to cloud services and online stores. Your software has to work with everything around it, so that is how we build it.",
} as const;

export const overview = {
  label: "WHO YOU WORK WITH",
  numbers: [
    { value: 20, suffix: "+", caption: "Years software leadership" },
    { value: 8, suffix: "+", caption: "Years engineering complex systems" },
  ],
  paragraph:
    "DigiDan is a South African software engineering and digital solutions company. We combine more than twenty years of software development leadership with deep work across custom software, e-commerce, systems integration and production-grade AI. We think about the whole system: the people, the data, the business rules and what happens when something fails. That is how we build software that holds up in the real world.",
} as const;

export const footer = {
  legalName: "DIGIDAN (PTY) LTD",
  location: "SOUTH AFRICA | DIGIDAN.CO.ZA",
  contact: "Contact us",
} as const;

/**
 * Frequently asked questions. Plain, factual answers drawn from the company
 * profile. Rendered visibly and mirrored into FAQPage structured data, so both
 * people and answer engines get clear, accurate responses.
 */
export const faq = {
  label: "QUESTIONS",
  title: "Common questions",
  items: [
    {
      q: "What does DigiDan do?",
      a: "DigiDan is a South African software engineering and digital solutions company. We build custom software, e-commerce platforms, systems integration and production-grade AI, and we support them once they are live.",
    },
    {
      q: "Where is DigiDan based?",
      a: "We are based in South Africa and work with clients locally and remotely. Our deployment patterns, local-first, hybrid and cloud, are designed for South African operating realities.",
    },
    {
      q: "What services does DigiDan offer?",
      a: "Custom software and product engineering, e-commerce and digital platforms including nopCommerce, systems, API and data integration, AI and intelligent automation, and cloud, resilience and operations.",
    },
    {
      q: "Do you build and support online stores?",
      a: "Yes. We implement, customise, extend and support nopCommerce stores, covering catalogue, pricing, integrations, monitoring and day-to-day operational tooling.",
    },
    {
      q: "Do you work with AI and automation?",
      a: "Yes. We integrate AI into business workflows with clear rules, evaluation, cost controls and a person in control of anything that touches records or money.",
    },
    {
      q: "Is DigiDan a bank or a fintech company?",
      a: "No. DigiDan is a software engineering partner, not a bank or a licensed financial provider. Some of our engineers have deep financial-systems experience, which we bring to your software when the work calls for that level of rigour.",
    },
    {
      q: "How do I start a project?",
      a: "Tell us the problem you are trying to solve. Email hello@digidan.co.za and we will take it from there.",
    },
  ],
} as const;

/**
 * Ecosystem graph. Illustrates the statement: the DigiDan core in the middle,
 * with the real-world systems it connects arranged around it. Node labels are
 * the same systems named in the approved statement copy.
 */
export const ecosystem = {
  label: "ONE CONNECTED SYSTEM",
  title: "Your software has to work with everything around it.",
  core: "DIGIDAN CORE",
  nodes: [
    "Business tools",
    "Cloud services",
    "Online stores",
    "APIs and data feeds",
    "Legacy systems",
  ],
} as const;

/**
 * Closing call to action. British English, no em dashes, in the DigiDan voice.
 */
export const cta = {
  label: "START HERE",
  title: "Tell us what you are trying to build.",
  paragraph:
    "Whatever you are trying to run in the real world, tell us the problem. We will design for all of it: the people, the data and what happens when something fails.",
  primary: "Start a project",
  secondary: "See what we can do",
  emailPlaceholder: "Enter your work email",
  emailAction: "Talk to us",
  emailNote: "We only use your address to reply to you. Nothing else.",
} as const;
