import "@/app/_config/dbConnect";
import "@/app/_config/schemas";
import { FileList } from "@/components/server";
import { UserData, UserInfo } from "./client";

export default function Page() {
  return (
    <div className="box fileMenu">
      <h2>Uploaded Files</h2>
      <FileList className="dashboardFiles" />
    </div>
  );
}
