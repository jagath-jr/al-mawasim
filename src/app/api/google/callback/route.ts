import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("GOOGLE TOKENS:");
    console.log(tokens);

    return NextResponse.json({
      success: true,
      message:
        "Google authorization successful. Check your terminal for the refresh token.",
      hasRefreshToken: !!tokens.refresh_token,
    });
  } catch (error) {
    console.error("OAuth callback error:", error);

    return NextResponse.json(
      {
        error: "Failed to exchange authorization code",
      },
      { status: 500 }
    );
  }
}