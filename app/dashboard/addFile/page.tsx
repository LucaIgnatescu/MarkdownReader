import "@/app/_config/dbConnect.ts";
import "@/app/_config/schemas";
import { redirect } from "next/navigation";
import mongoose,  { Types } from "mongoose";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { IFile , IUser} from "@/app/_config/schemas";

const MB16: number = 16777271; //16 mb in bytes
const FileModel = mongoose.model("File");
const UserModel = mongoose.model<IUser>("User");

export default async function Page() {
  async function addFile(data: FormData) {
    //server action to upload file
    "use server";
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value as string;

    let userId,username;

    try {
      const { payload} = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );
      userId = payload.userId;
      username = payload.username;
    } catch (err) {
      redirect("/auth/login");
    }

    
    const fileData: File = data.get("fileContent") as File;

    if (fileData.type !== 'text/markdown'){
      redirect("/dashboard/addFile");
    }

    const content: Buffer = Buffer.from(await fileData.arrayBuffer());

    if (content.BYTES_PER_ELEMENT * content.length > MB16) {
      redirect("/dashboard/addFile");
    }

    const newFile = new FileModel<IFile>({
      fileName: data.get("fileName") as string,
      data: content,
      size: content.length,
      owner: userId as Types.ObjectId
    });


    try {
      await UserModel.findByIdAndUpdate(userId, {$push: {"files":newFile}});
      await newFile.save();

    } catch (err) {
      console.error(err);
      redirect("/dashboard/addFile");
    }
    redirect("/dashboard");
  }

  return (
    <>
    <p>
      This is where you upload files. It should only accept .md files. Any other extension should redirect you back here without any actual upload. It will look like nothing happened. I have not implemented messages for the user for this route yet. 
    </p>
      <form action={addFile}>
        <label>
          File Name: <input name="fileName" />
        </label>
        <br />
        <input type="file" name="fileContent" />
        <input type="submit" value="Upload File" />
      </form>
    </>
  );
}
