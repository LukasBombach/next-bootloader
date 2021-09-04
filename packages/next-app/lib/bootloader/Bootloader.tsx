import { Head } from "next/document"; // eslint-disable-line @next/next/no-document-import-in-page

export class Bootloader extends Head {
  render() {
    console.log(this.context);

    return <>{this.props.children}</>;
  }
}
