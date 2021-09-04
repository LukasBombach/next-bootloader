import Document, { Html, Main } from "next/document";
import { LoadInOrder, Font, Script, InlineScript } from "../lib/bootloader";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <LoadInOrder>
          <InlineScript>{`console.log("Some consent init code");`}</InlineScript>
          <InlineScript>{`console.log("Some ads init code");`}</InlineScript>

          <Font name="Kaisei" truetype="/fonts/kaisei-regular.ttf" />
          <Font name="Kaisei" truetype="/fonts/kaisei-bold.ttf" weight="bold" />

          <Script src="/3rdparty/consent.js" loadingPriority="high" />
          <Script src="/3rdparty/ads.js" />
          <Script src="/3rdparty/tracking.js" />
        </LoadInOrder>

        <body>
          <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
