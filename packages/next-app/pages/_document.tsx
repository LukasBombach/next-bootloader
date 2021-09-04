import Document, { Html, Head, Main, NextScript } from "next/document";
import { Font } from "../lib/bootloader";

import type { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <Font
          name="KaiseiHarunoUmi"
          truetype="/fonts/KaiseiHarunoUmi-Regular.ttf"
        />
        <Font
          name="KaiseiHarunoUmi"
          truetype="/fonts/KaiseiHarunoUmi-Bold.ttf"
          weight="bold"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
