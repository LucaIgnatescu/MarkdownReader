import { redirect } from "next/navigation";
import { encode } from "querystring";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface SessionInfo {
  userId: string;
  username: string;
  [k: string]: unknown;
}

export type Session = SessionInfo | {};

export function handleErrorRedirect(fragment: string, error: string) {
  const query = encode({ error });
  redirect(fragment + "?" + query);
}

export async function verifyToken(): Promise<SessionInfo | null> {
  const cookieStore = cookies();

  const token = cookieStore.get("authToken");

  if (token === undefined) {
    return null;
  }
  const tokenVal: string = token.value;

  const wrapVerify = async () : Promise<SessionInfo> =>
    new Promise((resolve, reject) => {
      jwtVerify(tokenVal, new TextEncoder().encode(process.env.TOKEN_SECRET))
        .then(({ payload }) => resolve(payload as SessionInfo))
        .catch((err) => reject(null));
    });
  
  try {
    const payload:SessionInfo = await wrapVerify();
    return payload;
  } catch (err) {
    return null;
  }
}
