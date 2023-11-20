import Link from "next/link";
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
        For now, you can upload files and view a list of files that have already
        been uploaded
      </p>
      <p> Ownership will be implemented after authentication</p>

      <div>
        <h2>Session information:</h2>
        <UserData>
          <UserInfo></UserInfo>
        </UserData>
      </div>
      <Link href="/dashboard/addFile"> Add a file </Link>
      <h2>User files</h2>
      <FileList />
    </main>
  );
}
