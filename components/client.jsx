"use client";
import { useSearchParams } from "next/navigation";
export function ErrorMessage() {
  const err = useSearchParams().get("error");
  if (err)
    return (
      <>
        <p>{err}</p>
      </>
    );
}
