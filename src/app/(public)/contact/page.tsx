import { getContactSettings } from "@/actions/contact";
import ContactClient from "./ContactClient";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getContactSettings();
  return <ContactClient settings={settings} />;
}