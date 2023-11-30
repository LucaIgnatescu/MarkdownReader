import showdown from "showdown";
import mongoose from "mongoose";
import { IFile, IUser } from "@/app/_config/schemas";
import { verifyToken } from "@/utils";
import type { SessionInfo } from "@/utils";
import { SideBar } from "./server";
import { Content, EditingContext, ViewManager } from "./client";

const UserModel = mongoose.model<IUser>("User");

export default async function Page({ params }: { params: { fileID: string } }) {
  const FileModel = mongoose.model<IFile>("File");

  let file;

  try {
    file = await FileModel.findById(params.fileID);
    if (file === null) {
      return <h1>File does not exist</h1>;
    }
  } catch (err) {
    console.error(err);
    return <h1> File does not exist </h1>;
  }

  const fileID = params.fileID;
  const payload = await verifyToken();
  if (payload === null) {
    return <h1> You are not authorized to view this page</h1>;
  }
  const { userId } = payload as SessionInfo;
  const user = await UserModel.findById(userId);
  const hasFile = user?.files?.some((file) => file._id.equals(fileID));
  if (!hasFile) {
    return <h1>You are not allowed to view this file </h1>;
  }

  const converter = new showdown.Converter();

  const contents: string = file.data.toString();
  const html: string = converter.makeHtml(contents);

  return (
    <div id="filepagewrapper">
      <ViewManager markdown={contents} fileID={fileID}>
        <>
          <SideBar></SideBar>
          <Content id="fileContent">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </Content>
        </>
      </ViewManager>
    </div>
  );
}
