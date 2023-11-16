import { redirect } from "next/navigation";
import { encode } from "querystring";

export function handleErrorRedirect(fragment: string, error: string) {
  const query = encode({ error });
  redirect(fragment+"?"+ query);
}
