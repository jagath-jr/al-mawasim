import { getContactSettings } from "@/actions/contact";
import FooterClient from "./FooterClient";

export default async function Footer() {
  const settings = await getContactSettings();
  return <FooterClient settings={settings} />;
}