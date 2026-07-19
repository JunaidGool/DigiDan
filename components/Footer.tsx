import { LogoMark, Wordmark } from "./Logo";
import { footer, CONTACT_HREF } from "@/content/home";

/**
 * Footer (spec 3.7): the engine room. Amber seam on top, obsidian body.
 * Mini mark, wordmark, address lines, one Contact us button.
 */
export function Footer() {
  return (
    <footer className="seam-top bg-obsidian">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="flex items-center gap-3 text-amber-d">
            <LogoMark size={30} variant="outline" title="DigiDan" />
            <Wordmark className="text-base text-platinum" />
          </span>
          <p className="label label-d mt-6">{footer.legalName}</p>
          <p className="label label-d mt-2">{footer.location}</p>
        </div>

        <a href={CONTACT_HREF} className="btn btn-amber-d self-start md:self-auto">
          {footer.contact} <span aria-hidden="true">▸</span>
        </a>
      </div>
    </footer>
  );
}
