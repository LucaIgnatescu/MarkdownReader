import { FileList } from "@/components/server";
import { EditMenu } from "./client";

export function SideBar() {
  return (
    <div id="sidebar">
      <FileList className="sidebarFiles"></FileList>
      <span>Delete</span>
      <EditMenu></EditMenu>
    </div>
  );
}

