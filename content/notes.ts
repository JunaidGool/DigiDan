/**
 * Field notes registry. The essay bodies live in app/notes/<slug>/page.mdx;
 * this holds the metadata used by the index, the article header and the sitemap.
 * Notes are curated and evergreen — architecture thinking, not news.
 * Every technical claim must be verified by the partners before publishing.
 */

export type Note = {
  slug: string;
  title: string;
  dek: string;
  topic: string;
  date: string; // ISO, for sorting + <time>
  displayDate: string;
  minutes: number;
  author: string;
};

export const notesIntro = {
  eyebrow: "Field notes",
  heading: "How we think about the hard parts.",
  lead: "Short, evergreen notes on the engineering behind financial-grade systems — written by the people who build them.",
} as const;

export const notes: Note[] = [
  {
    slug: "idempotent-consumers-under-duplicate-delivery",
    title: "Idempotent consumers under duplicate delivery",
    dek: `“Exactly-once delivery” doesn’t exist — so we build exactly-once effect into the consumer instead, the way a ledger requires.`,
    topic: "Event-driven architecture",
    date: "2026-07-16",
    displayDate: "July 2026",
    minutes: 8,
    author: "DigiDan Engineering",
  },
  {
    slug: "ai-inside-a-deterministic-frame",
    title: "AI inside a deterministic frame",
    dek: "Why we treat language models as volatile components — and the rails we build around them before they touch anything that matters.",
    topic: "AI engineering",
    date: "2026-07-16",
    displayDate: "July 2026",
    minutes: 7,
    author: "DigiDan Engineering",
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
