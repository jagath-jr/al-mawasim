import { getAboutSettings } from "@/actions/about";
import AboutClient from "./AboutClient";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getAboutSettings();
  return <AboutClient settings={settings} />;
}