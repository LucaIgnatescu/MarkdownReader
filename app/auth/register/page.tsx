import { ErrorMessage } from "@/components/client";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { encode } from "querystring";
import bcrypt from "bcrypt";
import { IUser } from "@/app/_config/schemas";
import { handleErrorRedirect } from "../utils";

export default function Page() {
  async function register(e: FormData) {
    "use server";

    const User = mongoose.model<IUser>("User");
    if (e.get("password") !== e.get("retyped")) {
      handleErrorRedirect("/auth/register", "Passwords do not match!");
    }
    const username: string = (e.get("username") as string) ?? " ";
    const password = (e.get("password") as string) ?? " ";

    if (await User.exists({ username: username })) {
      handleErrorRedirect("/auth/register", "Username already exists");
    }
    /**
     * TODO: add more username checking like lowercase everything etcetcetc
     */
    const saltRounds = 10;
    let errorCheck: string = "";
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        handleErrorRedirect("/auth/register", "Server error. Please try again");
      }
      console.log("made it here");
      try {
        const newUser = new User<IUser>({ username, password: hash });
        await newUser.save();
        console.log("user successfully created");
      } catch (e) {
        console.error(e);
        errorCheck = "Server error. Please try again";
      }
    });
    if (errorCheck !== "") {
      handleErrorRedirect("/auth/register", errorCheck);
    }
    redirect("/auth/login");
  }

  return (
    <>
      <ErrorMessage />

      <form action={register}>
        <label htmlFor="username">Username: </label>
        <input name="username" id="username" type="text" required></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <input name="password" id="password" type="password" required></input>
        <br></br>
        <label htmlFor="retyped">Retype password: </label>
        <input name="retyped" id="retyped" type="password" required></input>
        <br></br>
        <input type="submit" value={"Submit!"}></input>
      </form>
    </>
  );
}
