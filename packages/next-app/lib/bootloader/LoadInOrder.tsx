import { posix } from "path";
import { Head } from "next/document"; // eslint-disable-line @next/next/no-document-import-in-page

type BuildManifest = {
  devFiles: readonly string[];
  ampDevFiles: readonly string[];
  polyfillFiles: readonly string[];
  lowPriorityFiles: readonly string[];
  pages: {
    "/_app": readonly string[];
    [page: string]: readonly string[];
  };
  ampFirstPages: readonly string[];
};

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

export function normalizePagePath(page: string): string {
  // If the page is `/` we need to append `/index`, otherwise the returned directory root will be bundles instead of pages
  if (page === "/") {
    page = "/index";
  } else if (/^\/index(\/|$)/.test(page)) {
    page = `/index${page}`;
  }
  // Resolve on anything that doesn't start with `/`
  if (!page.startsWith("/")) {
    page = `/${page}`;
  }
  // Throw when using ../ etc in the pathname
  const resolvedPage = posix.normalize(page);
  if (page !== resolvedPage) {
    throw new Error(
      `Requested and resolved page mismatch: ${page} ${resolvedPage}`
    );
  }
  return page;
}

function normalizePathSep(path: string): string {
  return path.replace(/\\/g, "/");
}

function denormalizePagePath(page: string) {
  page = normalizePathSep(page);
  if (page.startsWith("/index/")) {
    page = page.slice(6);
  } else if (page === "/index") {
    page = "/";
  }
  return page;
}

export class LoadInOrder extends Head {
  getDocumentFiles(): DocumentFiles {
    const { buildManifest, inAmpMode } = this.context;
    const pathname = this.context.__NEXT_DATA__.page;

    const sharedFiles = this.getPageFiles("/_app");
    const pageFiles = inAmpMode ? [] : this.getPageFiles(pathname);

    return {
      sharedFiles,
      pageFiles,
      allFiles: [...new Set([...sharedFiles, ...pageFiles])],
    };
  }

  getPageFiles(page: string): readonly string[] {
    const { buildManifest } = this.context;
    const normalizedPage = denormalizePagePath(normalizePagePath(page));
    let files = buildManifest.pages[normalizedPage];

    if (!files) {
      console.warn(
        `Could not find files for ${normalizedPage} in .next/build-manifest.json`
      );
      return [];
    }

    return files;
  }

  render() {
    console.log(this.context);
    const files = this.getDocumentFiles();

    return (
      <>
        {this.getPreloadDynamicChunks()}
        {this.getPreloadMainLinks(files)}
        {this.getPolyfillScripts()}
        {this.getPreNextScripts()}
        {this.getDynamicChunks(files)}
        {this.getScripts(files)}
      </>
    );
  }
}
