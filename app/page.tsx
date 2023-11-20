import Link from "next/link";
import '@/app/_config/dbConnect';
import '@/app/_config/schemas';
import styles from "./page.module.css";
import mongoose from "mongoose";
import { UserData, UserInfo } from "@/components/client";
import { FileList } from "@/components/server";

export default async function Home() {
  const File = mongoose.model("File");
  const files = await File.find({});
  return (
    <main className={styles.main}>
      <p>
        This is the main page. To get started,
        <Link href="/auth/register"> register</Link>. Afterwards, you will be
        redirected to <Link href="/auth/login"> login</Link>.
      </p>
    </main>
  );
}
