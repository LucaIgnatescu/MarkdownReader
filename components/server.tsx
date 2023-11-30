import { verifyToken } from "@/utils";
import { cookies } from "next/headers";
import mongoose, { HydratedDocument } from "mongoose";
import { IFile, IUser } from "@/app/_config/schemas";
import Link from "next/link";

import style from "./styles.module.css";

export function File({ file }: { file: HydratedDocument<IFile> }) {
  return (
    <>
      <Link href={"/dashboard/view/" + file._id}>{file.fileName}</Link>
    </>
  );
}

export async function FileList({className}: {className?:string}) {
  const UserModel = mongoose.model<IUser>("User");

  const payload = await verifyToken();
  if (payload === null) {
    return <p>Not signed in</p>;
  }

  try {
    const user = await UserModel.findById(payload?.userId)
      .populate("files")
      .exec();

    const files = user?.files;

    if (files?.length === 0) {
      return <p>User has not uploaded any files</p>;
    }

    return (
        <ul className={className}>
          {files?.map((file: any) => (
            <li key={file?._id}>
              <File file={file}></File>
            </li> //make this a file component
          ))}
          </ul>
    );
  } catch (err) {
    return <p> Error</p>;
  }
}

export function NavBar() {
  return (
    <nav className={style.dashboard}>
      <Link href="/">Markdown Reader</Link>
      <Link href="/dashboard">Dashboard</Link>
      <br></br>
      <Link href="/dashboard/addFile">Add File</Link>
    </nav>
  );
}


export function BasicHeader() {
  return (
    <header className="basicHeader">
      <Link className="title" href="/">Markdown Reader</Link>
    </header>
  );
}


export function InfoBox({ text, className }: { text: string, className:string }) {
  return (
    <div className={className}>
      <p>{text}</p>
    </div>
  );
}
