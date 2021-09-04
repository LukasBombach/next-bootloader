import { Head } from "next/document"; // eslint-disable-line @next/next/no-document-import-in-page
import type { VFC } from "react";

export interface InlineScriptProps {
  children: string;
}

export const InlineScript: VFC<InlineScriptProps> = ({ children }) => (
  <Head>
    <script dangerouslySetInnerHTML={{ __html: children }} />
  </Head>
);
