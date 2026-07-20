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
    "We build custom software, online platforms and practical AI systems. We design for the full environment your software runs in, not just the screens and code.",
  wordmark: "d g d n",
} as const;

export const nav = [
  { label: "What we do", href: "/#services" },
  { label: "Company", href: "/#overview" },
  { label: "Work", href: "/work" },
] as const;

export const hero = {
  eyebrow: "CUSTOM SOFTWARE AND AUTOMATION",
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
    "DigiDan is led by Danyal Motan and Junaid Gool as equal partners. We think about the whole system: the people, the hardware, the networks, the data, the business rules, and what happens when something fails. That is how we build software that holds up in the real world.",
} as const;

export const work = {
  title: "Selected work",
  label: "LIVE AND IN USE TODAY",
  intro:
    "A few of the systems we have designed, built and still run. Each one solves a real problem for the business using it.",
  items: [
    {
      name: "TrimBase",
      graphic: "platforms",
      blurb:
        "A lean base platform that gives a new product only the parts it needs to launch, with room to grow.",
    },
    {
      name: "DeploySeal",
      graphic: "platforms",
      blurb:
        "Release assurance that seals a build before it ships, so what reaches production is exactly what was tested.",
    },
    {
      name: "JujHub",
      graphic: "platforms",
      blurb:
        "A hub that connects the systems a business already runs, moving data between them cleanly and on time.",
    },
    {
      name: "ProductLens",
      graphic: "ai",
      blurb:
        "A review layer that reads product data and surfaces the issues a person needs to see, before customers do.",
    },
    {
      name: "Inboxlio",
      graphic: "ai",
      blurb:
        "Inbound messages triaged and routed automatically, with a person in control of anything that matters.",
    },
  ],
} as const;

export const footer = {
  legalName: "DIGIDAN (PTY) LTD",
  location: "SOUTH AFRICA | DIGIDAN.CO.ZA",
  contact: "Contact us",
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
