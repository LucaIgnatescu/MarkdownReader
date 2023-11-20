import Link from "next/link";
import '@/app/_config/dbConnect';
import '@/app/_config/schemas';

export default function Layout({children}: {children:React.ReactNode}){
  return <>
  <Link href='/dashboard'>Main Dashboard Page</Link>
  <br>
  </br>
  <Link href='/dashboard/addFile'>Upload a file</Link>
  {children}
  </>
}