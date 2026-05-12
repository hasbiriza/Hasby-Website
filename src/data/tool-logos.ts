import type { StaticImageData } from "next/image";
import AwsLogo from "../../assets/raw/tools_logo/Amazon_Web_Services_Logo.svg.png";
import DokuLogo from "../../assets/raw/tools_logo/DokuLogo.png";
import KlaviyoLogo from "../../assets/raw/tools_logo/Klaviyo-primary-logo-charcoal.svg.png";
import RemixLogo from "../../assets/raw/tools_logo/LOGO REMIX.jpg";
import NodeLogo from "../../assets/raw/tools_logo/Node.js_logo.png";
import ShopifyLogo from "../../assets/raw/tools_logo/Shopify_logo.svg.png";
import XenditLogo from "../../assets/raw/tools_logo/Xendit logo.png";
import AustraliaPostLogo from "../../assets/raw/tools_logo/australia post.png";
import GoLogo from "../../assets/raw/tools_logo/golang logo.webp";
import MidtransLogo from "../../assets/raw/tools_logo/midtrans.png";
import PaypalLogo from "../../assets/raw/tools_logo/paypal.png";

export interface ToolLogo {
  src: StaticImageData;
  alt: string;
}

export const toolLogos: ToolLogo[] = [
  { src: ShopifyLogo, alt: "Shopify logo" },
  { src: KlaviyoLogo, alt: "Klaviyo logo" },
  { src: NodeLogo, alt: "Node.js logo" },
  { src: AwsLogo, alt: "Amazon Web Services logo" },
  { src: GoLogo, alt: "Go logo" },
  { src: RemixLogo, alt: "Remix logo" },
  { src: PaypalLogo, alt: "PayPal logo" },
  { src: XenditLogo, alt: "Xendit logo" },
  { src: MidtransLogo, alt: "Midtrans logo" },
  { src: DokuLogo, alt: "Doku logo" },
  { src: AustraliaPostLogo, alt: "Australia Post logo" },
];
