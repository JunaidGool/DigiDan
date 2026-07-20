import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the DigiDan (Pty) Ltd website, digidan.co.za.",
  alternates: { canonical: "/terms" },
};

/*
 * DRAFT — review by a qualified attorney and set the effective date before
 * publishing.
 */
export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="[effective date on publication]">
      <h2>1. Acceptance of these terms</h2>
      <p>
        By accessing or using digidan.co.za (the &ldquo;site&rdquo;), you agree
        to these Terms of Use. If you do not agree, please do not use the site.
      </p>

      <h2>2. About this site</h2>
      <p>
        The site is provided by DigiDan (Pty) Ltd for general information about
        our services. Using the site does not create a client, advisory or
        contractual relationship. Any engagement for services is governed by a
        separate written agreement.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You agree to use the site lawfully and not to interfere with or disrupt
        the site or its security, attempt to gain unauthorised access, scrape,
        harvest or misuse content or data, or use the site to transmit anything
        unlawful or harmful.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The site and its design, code, text, graphics and marks are owned by
        DigiDan (Pty) Ltd or its licensors and are protected by law. You may view
        and share the content for personal, non-commercial reference, but you may
        not copy, reproduce or reuse it commercially without our written
        permission.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        The site may link to third-party websites or services that we do not
        control. We are not responsible for their content, availability or
        practices, and a link does not imply endorsement.
      </p>

      <h2>6. No warranties</h2>
      <p>
        The site and its content are provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. While we take care to keep information accurate and up
        to date, we make no warranties, express or implied, about its
        completeness, accuracy, reliability or availability. Information on the
        site may change without notice.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, DigiDan (Pty) Ltd will not be
        liable for any indirect, incidental or consequential loss, or any loss of
        profits, data or goodwill, arising from your use of, or inability to use,
        the site. Nothing in these terms excludes liability that cannot be
        excluded by law.
      </p>

      <h2>8. Privacy</h2>
      <p>
        Our handling of personal information is described in our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of South Africa, and
        you submit to the jurisdiction of the South African courts.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The current version is
        always available on this page.
      </p>
    </LegalLayout>
  );
}
