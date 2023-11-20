import '@/app/_config/dbConnect';
import '@/app/_config/schemas';

import { ErrorMessage } from "@/components/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import mongoose from "mongoose";
import { IUser } from "@/app/_config/schemas";
import { handleErrorRedirect } from "@/utils";
import bcrypt from "bcrypt";

export default function Page() {
  async function login(e: FormData) {
    "use server";
    //if you can find in database

    const username = (e.get("username") as string) ?? "";
    const password = (e.get("password") as string) ?? "";

    const UserModel = mongoose.model<IUser>("User");

    const user = await UserModel.findOne({ username }).exec();

    if (!user) {
      return handleErrorRedirect(
        "/auth/login",
        "Username or password does not match."
      );
    }
    const result = bcrypt.compareSync(password, user.password);

    if (result === false) {
      handleErrorRedirect(
        "/auth/login",
        "Username or password does not match."
      );
    }

    const cookieStore = cookies();
    const tokenParams = {
      userId: user?.id,
      username,
    };
    const token = await new SignJWT(tokenParams)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    cookieStore.set({
      name: "authToken",
      value: token as string,
    });

    redirect("/dashboard");
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
