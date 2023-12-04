"use client";
import { useSearchParams} from "next/navigation";

export function ErrorMessage({ className }: { className?: string }) {
  const err = useSearchParams().get("error");
  if (err)
    return (
      <>
        <p className={className}>{err}</p>
      </>
    );
}

export function TestDelete() {
  function testDelete() {
    const id = "65652320d55996a60076265e";

    fetch("/api/file/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response.ok);
        return response.json();
      })
      .then((data) => console.log(data));
  }
  return <button onClick={testDelete}>Test</button>;
}
