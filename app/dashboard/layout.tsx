import Link from "next/link";
import '@/app/_config/dbConnect';
import '@/app/_config/schemas';
import { NavBar } from "@/components/server";

export default function Layout({children}: {children:React.ReactNode}){
  return <>
  <NavBar></NavBar>
  {children}
  </>
}