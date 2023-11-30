import Link from "next/link";
import "@/app/_config/dbConnect";
import "@/app/_config/schemas";
import styles from "./page.module.css";
import { BasicHeader,InfoBox } from "@/components/server";


function LoginBox() {
  return (
    <div className="login box">
      <Link href="/auth/register" className="linkbutton">
        Register
      </Link>
      <Link href="/auth/login" className="linkbutton">
        Login
      </Link>
    </div>
  );
}

export default async function Home() {
  const welcomeText = `
  Welcome! This is Markdown Reader, an app that allows you to upload markdown documents and view them in the browser.
  Register an account to get started!
  `;
  return (
    <main className={styles.main}>
      <BasicHeader></BasicHeader>
      <div className="wrapper">
        <InfoBox className="info box" text={welcomeText}></InfoBox>
        <LoginBox></LoginBox>
      </div>
    </main>
  )
}
