import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value as string;

  try {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
