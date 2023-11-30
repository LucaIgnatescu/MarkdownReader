import { BasicHeader } from "@/components/server";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BasicHeader></BasicHeader>
      <div className="wrapper">{children}</div>
    </>
  );
}
