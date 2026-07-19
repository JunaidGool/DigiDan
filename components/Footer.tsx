import { LogoMark, Wordmark } from "./Logo";
import { footer, CONTACT_HREF } from "@/content/home";

/**
 * Footer (The Grid): a cyan light rule seals the base of the page, with the
 * mark, wordmark, address lines and the amber Contact action.
 */
export function Footer() {
  return (
    <footer className="relative">
      <div className="shell">
        <div className="rule-cyan" />
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-3 text-cyan">
              <LogoMark size={30} title="DigiDan" />
              <Wordmark className="text-base text-white" />
            </span>
            <p className="label mt-6">{footer.legalName}</p>
            <p className="label mt-2">{footer.location}</p>
          </div>

          <a href={CONTACT_HREF} className="btn btn-amber self-start md:self-auto">
            {footer.contact} <span aria-hidden="true">▸</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
