import { LogoMark } from "./Logo";
import { hero } from "@/content/home";

/**
 * The containment cube (spec 3.2): a 230px CSS 3D wireframe cube, 1px ink lines,
 * one revolution every 40s. Inside sits the tri-colour DigiDan mark, static,
 * upright, centred, never distorted or recoloured. The cube is decorative, so
 * it is hidden from assistive tech and labelled by the caption below it.
 *
 * The downward translate that makes the cube straddle the light/dark seam (the
 * one allowed grid violation) is applied by the Hero and disabled below 960px.
 */
export function ContainmentCube() {
  return (
    <figure className="flex flex-col items-center">
      <div className="cube-scene" aria-hidden="true">
        <div className="cube">
          <span className="cube-face front" />
          <span className="cube-face back" />
          <span className="cube-face right" />
          <span className="cube-face left" />
          <span className="cube-face top" />
          <span className="cube-face bottom" />
        </div>
        <div className="cube-core">
          <LogoMark size={132} variant="solid" title="The DigiDan core" />
        </div>
      </div>
      <figcaption className="label mt-8">{hero.cubeCaption}</figcaption>
    </figure>
  );
}
