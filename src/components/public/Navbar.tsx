import { getContactSettings } from "@/actions/contact";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const settings = await getContactSettings();
  
  return <NavbarClient settings={settings} />;
}