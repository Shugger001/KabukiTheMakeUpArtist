export const editorialWidths = [640, 960, 1280, 1920] as const;

export type EditorialVariant = {
  src: string;
  width: number;
};

/**
 * Build canonical variant paths for editorial assets.
 * Example output: /editorial/hero-imported-640.webp
 */
export function editorialVariants(baseName: string): EditorialVariant[] {
  return editorialWidths.map((width) => ({
    src: `/editorial/${baseName}-${width}.webp`,
    width,
  }));
}
