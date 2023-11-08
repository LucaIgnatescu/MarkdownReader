import Link from "next/link";
import styles from "./page.module.css";
import mongoose from "mongoose";

export default async function Home() {
  const File = mongoose.model("File");
  const files = await File.find({});
  return (
    <main className={styles.main}>
      <p> For now, you can upload files and view a list of files that have already been uploaded</p>
      <p> Ownership will be implemented after authentication</p>
      <Link href="/addFile"> Add a file </Link>
      <h2>Uploaded Files</h2>
      <ul>
      {files.map(file => <li key={file.id}>{file.fileName}</li>)}
      </ul>
    </main>
  );
}
