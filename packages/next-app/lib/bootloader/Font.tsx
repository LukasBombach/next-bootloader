import type { VFC, CSSProperties } from "react";

export interface FontProps {
  name: string;
  weight?: CSSProperties["fontWeight"] | CSSProperties["fontWeight"][];
  woff?: string;
  woff2?: string;
  truetype?: string;
  opentype?: string;
  "embedded-opentype"?: string;
  svg?: string;
}

export const Font: VFC<FontProps> = ({ name, weight = 400, ...formats }) => {
  const sources = Object.entries(formats)
    .map(([format, url]) => `url("${url}") format("${format}")`)
    .join(", ");

  return (
    <style global jsx style={{}}>{`
      @font-face {
        font-family: "${name}";
        font-weight: ${weight};
        src: ${sources};
        font-display: fallback;
      }
    `}</style>
  );
};
