import "@/app/_config/dbConnect";
import "@/app/_config/schemas";
import { NavBar } from "./server";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar>
      <div className="wrapper">{children}</div>
    </>
  );
}
