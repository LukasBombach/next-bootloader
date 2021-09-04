import { Head } from "next/document"; // eslint-disable-line @next/next/no-document-import-in-page
import type { VFC } from "react";

export type LoadingPriority = "high" | "medium" | "low";

export interface ScriptProps {
  src: string;
  loadingPriority?: LoadingPriority;
}

export const HighPriorityScript = ({ src }: Pick<ScriptProps, "src">) => (
  <Head>
    <link href={src} rel="preload" as="script" />
    <script async src={src} />
  </Head>
);

export const MediumPriorityScript = ({ src }: Pick<ScriptProps, "src">) => (
  <Head>
    <script async src={src} />
  </Head>
);

export const LowPriorityScript = ({ src }: Pick<ScriptProps, "src">) => {
  throw new Error("Sorry, not implemented yet");
};

export const Script: VFC<ScriptProps> = ({
  src,
  loadingPriority = "medium",
}) => {
  switch (loadingPriority) {
    case "high":
      return <HighPriorityScript src={src} />;
    case "medium":
      return <MediumPriorityScript src={src} />;
    case "low":
      return <LowPriorityScript src={src} />;
  }
};
