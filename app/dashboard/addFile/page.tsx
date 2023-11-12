import "@/app/_config/dbConnect.js"
import "@/app/_config/schemas.js"
import { redirect } from "next/navigation";
import mongoose from "mongoose";

const MB16: number = 16777271; //16 mb in bytes
const File = mongoose.model("File");

export default async function Page() {


  async function addFile(data: FormData) {
    //server action to upload file
    "use server";
    const filedata: ArrayBuffer = await (
      data.get("fileContent") as File
    ).arrayBuffer();
    const content: Buffer = Buffer.from(filedata);

    if (content.BYTES_PER_ELEMENT * content.length > MB16) {
      redirect("./addFile");
    }

    const newFile = new File({
      fileName: data.get("fileName"),
      data: content,
      size: content.length,
    });

    try{
      await newFile.save();
    } catch(err){
      console.error(err);
      redirect("/addFile");
    }
    redirect("/");
  }

  return (
    <>
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
