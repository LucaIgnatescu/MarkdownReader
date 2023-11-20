import { UserData, UserInfo } from "@/components/client";
import '@/app/_config/dbConnect';
import '@/app/_config/schemas';
import { FileList } from "@/components/server";

export default function Page() {
  return (
    <>
      <h1>Dashboard </h1>
      <p>
        This will be the dashboard for logged in users. You should only be here
        if you have successfully logged in
      </p>

      <h2>User Information</h2>
      <UserData>
        <UserInfo></UserInfo>
      </UserData>
      <h2>Files uploaded by user</h2>
      <FileList></FileList>
    </>
  );
}
