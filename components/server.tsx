import { verifyToken } from "@/utils";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { IFile , IUser} from "@/app/_config/schemas";

export async function FileList() {
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
      <div id="fileList">
        <ul>
          {files?.map((file: any) => (
            <li key={file?._id}>{file?.fileName}</li>//make this a file component
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    return <p> Error</p>;
  }
}
