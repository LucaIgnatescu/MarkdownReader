import Link from "next/link";
import { SignOutButton } from "./client";

export function NavBar() {
  return (
    <nav>
      <div className="navLinks">
        <Link href="/">Markdown Reader</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/addFile">Add File</Link>
      </div>

      <SignOutButton></SignOutButton>
    </nav>
  );
}
