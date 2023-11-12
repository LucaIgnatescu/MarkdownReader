"use client";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export function IndexPage() {


  return (
    <>
      <p>
        It looks like you are not signed in! Click below to log in with GitHub
      </p>

      <Link href="/api/auth/signin"> Log In</Link>
    </>
  );
}
