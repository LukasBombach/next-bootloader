import type { VFC } from "react";

export interface InlineScriptProps {
  children: string;
}

export const InlineScript: VFC<InlineScriptProps> = ({ children }) => (
  <script dangerouslySetInnerHTML={{ __html: children }} />
);
