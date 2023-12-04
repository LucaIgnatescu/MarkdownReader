import { FileList } from "@/components/server";
import { DeleteButton, EditMenu } from "./client";
import { ErrorMessage } from "@/components/client";

export function SideBar() {
  return (
    <div id="sidebar" className="fileMenu">
      <h2>Uploaded Files</h2>
      <FileList className="sidebarFiles"></FileList>
      <h2>File Controls</h2>
      <DeleteButton />
      <EditMenu className="editMenu"></EditMenu>
    </div>
  );
}
