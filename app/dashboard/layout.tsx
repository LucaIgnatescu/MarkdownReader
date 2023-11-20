import Link from "next/link";

export default function Layout({children}: {children:React.ReactNode}){
  return <>
  <Link href='/dashboard'>Main Dashboard Page</Link>
  <br>
  </br>
  <Link href='/dashboard/addFile'>Upload a file</Link>
  {children}
  </>
}