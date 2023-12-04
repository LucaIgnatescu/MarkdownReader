import "@/app/_config/dbConnect.ts";
import "@/app/_config/schemas";
import { redirect } from "next/navigation";
import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IFile, IUser } from "@/app/_config/schemas";
import { InfoBox } from "@/components/server";
import { ErrorMessage } from "@/components/client";
import { handleErrorRedirect } from "@/utils";
import { FileFormContent } from "./client";

const MB16: number = 16777271; //16 mb in bytes
const FileModel = mongoose.model("File");
const UserModel = mongoose.model<IUser>("User");

export default async function Page() {
  async function addFile(data: FormData) {
    //server action to upload file
    "use server";
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value as string;

    let userId, username;

    const redirectBack = handleErrorRedirect.bind(null, "/dashboard/addFile");

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );
      userId = payload.userId;
      username = payload.username;
    } catch (err) {
      handleErrorRedirect(
        "/auth/login",
        "Error authenticating. Please sign in again."
      );
    }

    const fileData: File = data.get("fileContent") as File;

    if (fileData.type !== "text/markdown") {
      redirectBack(
        "Form only accepts markdown (.md) files. Please try a different file."
      );
    }

    const content: Buffer = Buffer.from(await fileData.arrayBuffer());

    if (content.BYTES_PER_ELEMENT * content.length > MB16) {
      redirectBack("File too large. The file must not be over 16MB in size.");
    }

    const newFile = new FileModel<IFile>({
      fileName: data.get("fileName") as string,
      data: content,
      size: content.length,
      owner: userId as Types.ObjectId,
    });

    try {
      await UserModel.findByIdAndUpdate(userId, { $push: { files: newFile } });
      await newFile.save();
    } catch (err) {
      console.error(err);
      redirectBack("Server encountered an error. Please try again.");
    }
    redirect("/dashboard");
  }

  const text = `This is where you upload files. It should only accept .md files. Any other extension should redirect you back here without any actual upload. It will look like nothing happened. I have not implemented messages for the user for this route yet. `;
  return (
    <>
      <ErrorMessage className="info box error"></ErrorMessage>
      <form action={addFile} className="box form" id="uploadFile">
        <FileFormContent />
      </form>
    </>
  );
}
