import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "default_fallback_secret_key";
const key = new TextEncoder().encode(secretKey);

// Encrypt the session data into a JWT
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Session lasts for 24 hours
    .sign(key);
}

// Decrypt and verify the JWT
export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    return null;
  }
}