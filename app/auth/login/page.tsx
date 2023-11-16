import { ErrorMessage } from "@/components/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import mongoose from "mongoose";

export default function Page() {
  async function login(e: FormData) {
    "use server";
    //if you can find in database

    const User = mongoose.model('User');
     

    const cookieStore = cookies();
    const token = await new SignJWT({ joseToken: "hello" })
      .setProtectedHeader({alg:'HS256', typ: "JWT"})
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    cookieStore.set({
      name: "authToken",
      value: token as string,
    });

    redirect("/dashboard/addFile");
  }

  return (
    <>
      <ErrorMessage />

      <form action={login}>
        <label htmlFor="username">Username: </label>
        <input name="username" id="username" type="text" required></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <input name="password" id="password" type="password" required></input>
        <br></br>
        <input type="submit" value={"Submit!"}></input>
      </form>
    </>
  );
}
