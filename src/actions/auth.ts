"use server";

import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 1. Verify Credentials against .env
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // 2. Create the Session Token (Valid for max 24h server-side just in case)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    const session = await encrypt({ user: "admin", expires });

    // 3. Set a highly secure HTTP-Only SESSION cookie
    (await cookies()).set("admin_session", session, { 
      // REMOVED 'expires' - This makes it a Session Cookie (deleted when browser closes)
      httpOnly: true, // Prevents JavaScript from reading the cookie (XSS protection)
      secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
      sameSite: "lax" 
    });
    
    // 4. Redirect to the admin dashboard
    redirect("/admin");
  } else {
    // If login fails, return an error state
    return { error: "Invalid username or password" };
  }
}

export async function logoutAction() {
  // Delete the cookie to securely log out
  (await cookies()).delete("admin_session");
  redirect("/login");
}