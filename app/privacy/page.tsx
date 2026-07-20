import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DigiDan (Pty) Ltd collects, uses, shares and protects personal information, in line with the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy" },
};

/*
 * DRAFT — review by a qualified attorney and fill the placeholders below before
 * publishing: [Information Officer name], [postal address], and the effective
 * date. Verify the Information Regulator's current contact details.
 */
export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="[effective date on publication]">
      <h2>Introduction</h2>
      <p>
        This Privacy Policy explains how DigiDan (Pty) Ltd (&ldquo;DigiDan&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, shares and protects
        personal information when you visit digidan.co.za or contact us. We are
        the responsible party for this processing under the Protection of
        Personal Information Act, 2013 (POPIA).
      </p>

      <h2>Information Officer</h2>
      <p>
        Our Information Officer can be reached at{" "}
        <a href="mailto:hello@digidan.co.za">hello@digidan.co.za</a>.
        [Information Officer name and postal address to be confirmed.]
      </p>

      <h2>What personal information we collect</h2>
      <p>We keep the personal information we collect to a minimum.</p>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you use the contact form
          or email us, we collect your email address and anything you choose to
          include in your message.
        </li>
        <li>
          <strong>Information collected automatically.</strong> If analytics is
          enabled, we use a privacy-friendly, cookieless tool that records
          aggregated, anonymised usage (such as page views and approximate
          region) and does not identify you. Our hosting provider may keep
          standard server logs (such as IP address and browser type) for
          security and reliability.
        </li>
      </ul>
      <p>
        We do not collect special personal information, and we do not knowingly
        collect information from children.
      </p>

      <h2>Why we collect it, and our lawful basis</h2>
      <p>We process your personal information to:</p>
      <ul>
        <li>respond to your enquiry and communicate with you;</li>
        <li>provide, secure, maintain and improve the website; and</li>
        <li>comply with our legal obligations.</li>
      </ul>
      <p>
        Our lawful bases under POPIA include your consent (which you may
        withdraw), entering into or performing an agreement with you, and our
        legitimate interests in operating our business, balanced against your
        rights.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your personal information. We share it only with operators
        who process it on our behalf, under agreement and appropriate
        safeguards, such as our contact-form provider, our privacy-friendly
        analytics provider, and our email, hosting and infrastructure providers.
        We may also disclose information where required by law.
      </p>

      <h2>Cross-border transfers</h2>
      <p>
        Some operators may process information outside South Africa. Where this
        happens, we take reasonable steps to ensure your information receives a
        comparable level of protection, as required by POPIA.
      </p>

      <h2>How we protect your information</h2>
      <p>
        We take reasonable technical and organisational measures to safeguard
        personal information, including encryption in transit, access controls,
        and collecting only what we need. No method of transmission or storage is
        completely secure, but we work to protect your information and to address
        any incident appropriately, including notifying you and the Information
        Regulator where the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep personal information only for as long as necessary for the
        purposes in this policy, to meet our legal obligations, or to resolve
        disputes, after which it is deleted or anonymised.
      </p>

      <h2>Cookies</h2>
      <p>
        The website does not use advertising or tracking cookies. Any analytics
        used is cookieless and does not identify you.
      </p>

      <h2>Your rights</h2>
      <p>Under POPIA you have the right to:</p>
      <ul>
        <li>ask what personal information we hold and request access to it;</li>
        <li>ask us to correct or delete your personal information;</li>
        <li>object to, or ask us to restrict, certain processing;</li>
        <li>withdraw consent where we rely on it; and</li>
        <li>lodge a complaint with the Information Regulator.</li>
      </ul>
      <p>
        To exercise any of these, email{" "}
        <a href="mailto:hello@digidan.co.za">hello@digidan.co.za</a>. We may need
        to verify your identity before acting on a request.
      </p>

      <h2>Complaints to the Information Regulator</h2>
      <p>
        If you believe we have not handled your personal information lawfully,
        you may lodge a complaint with the Information Regulator (South Africa).
        Their current contact details are published at{" "}
        <a href="https://inforegulator.org.za" rel="noreferrer" target="_blank">
          inforegulator.org.za
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The latest version is always
        available on this page, with the effective date shown above.
      </p>
    </LegalLayout>
  );
}
