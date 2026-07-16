/**
 * Privacy notice — POPIA-aligned, grounded in what this website actually does
 * (contact form via Formspree, optional cookieless Plausible analytics, static
 * hosting). This is a DRAFT: everything in [square brackets] must be completed
 * by DigiDan, and the whole notice must be reviewed by a qualified advisor
 * before it is published. Do not present this as final legal text.
 */

export const privacyMeta = {
  title: "Privacy notice",
  lead: "This notice explains how DigiDan (Pty) Ltd collects, uses and protects personal information through this website, in line with South Africa's Protection of Personal Information Act (POPIA).",
  effectiveDate: "[ effective date ]",
  draftBanner:
    "Draft — pending legal review. Every item in [brackets] must be completed by DigiDan, and this notice reviewed by a qualified advisor, before it is published.",
} as const;

export type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };
export type Section = { heading: string; blocks: Block[] };

export const sections: Section[] = [
  {
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: 'DigiDan (Pty) Ltd ("DigiDan", "we", "us") is a South African software engineering company. This notice applies to the website at digidan.co.za.',
      },
      {
        type: "p",
        text: "The responsible party for your personal information is DigiDan (Pty) Ltd. Our Information Officer is [ name ], who can be reached at [ privacy@digidan.co.za ].",
      },
    ],
  },
  {
    heading: "What we collect",
    blocks: [
      {
        type: "ul",
        items: [
          "Contact form: your name, email address, company (optional) and the content of your message.",
          "Analytics (if enabled): a privacy-friendly, cookieless tool (Plausible) that records aggregate usage — pages visited, referrer, approximate country and device type — without cookies and without identifying you personally.",
          "Technical logs: our hosting provider may automatically log standard request data (such as IP address and browser type) for security and reliability.",
        ],
      },
    ],
  },
  {
    heading: "Why we collect it",
    blocks: [
      {
        type: "ul",
        items: [
          "To respond to your enquiry and, where relevant, to take steps at your request toward work you ask us about.",
          "To keep the website secure, reliable and improved.",
        ],
      },
      {
        type: "p",
        text: "We do not sell your personal information, and we do not use it for advertising.",
      },
    ],
  },
  {
    heading: "Who processes it",
    blocks: [
      {
        type: "p",
        text: "We use trusted third-party operators to run the site. Depending on the current deployment, these include:",
      },
      {
        type: "ul",
        items: [
          "[ Formspree ] — delivers contact-form submissions to us.",
          "[ Plausible ] — cookieless website analytics (if enabled).",
          "[ our hosting provider ] — serves the website.",
        ],
      },
      {
        type: "p",
        text: "These operators process personal information on our behalf under agreements requiring appropriate safeguards. Confirm the current list against your live deployment.",
      },
    ],
  },
  {
    heading: "Cookies",
    blocks: [
      {
        type: "p",
        text: "This website does not use tracking or advertising cookies. Because our analytics is cookieless, no cookie-consent banner is required. Any strictly necessary cookies set by our host are limited to operating the site.",
      },
    ],
  },
  {
    heading: "Cross-border transfers",
    blocks: [
      {
        type: "p",
        text: "Some operators may process data outside South Africa (for example in the EU or United States). Where that happens, we rely on providers offering protections consistent with POPIA. [ Confirm processor locations and safeguards. ]",
      },
    ],
  },
  {
    heading: "How long we keep it",
    blocks: [
      {
        type: "p",
        text: "We keep enquiry information only as long as needed to respond and to maintain any resulting business relationship, after which it is deleted or anonymised. [ Set a specific retention period, e.g. 24 months after last contact. ]",
      },
    ],
  },
  {
    heading: "How we protect it",
    blocks: [
      {
        type: "p",
        text: "We apply the engineering and operational safeguards described on our Security page — including least-privilege access, encryption in transit, and audited handling of sensitive data.",
      },
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Under POPIA you may ask what personal information we hold about you, ask us to correct or delete it, object to processing, and withdraw consent where processing is based on consent.",
      },
      {
        type: "p",
        text: "To exercise any of these, contact our Information Officer at [ privacy@digidan.co.za ]. You may also lodge a complaint with the Information Regulator (South Africa).",
      },
    ],
  },
  {
    heading: "Changes to this notice",
    blocks: [
      {
        type: "p",
        text: "We may update this notice from time to time. The effective date above reflects the latest version.",
      },
    ],
  },
];
