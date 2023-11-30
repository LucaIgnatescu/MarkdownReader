import '@/app/_config/dbConnect';
import '@/app/_config/schemas';

import { ErrorMessage } from "@/components/client";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { IUser } from "@/app/_config/schemas";
import { handleErrorRedirect } from "@/utils";

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

    const hashWrapper = () =>
      new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            return reject("bcryptError");
          }
          try {
            const newUser = new User<IUser>({ username, password: hash });
            await newUser.save();
            console.log("user successfully created");
          } catch (e) {
            return reject("mongoError");
          }
          resolve("user created");
        });
      }); //this function exists because I cannot directly redirect from the callback because bcrypt is buggy in server actions so I have to wrap it in a promise:( 

    try {
      console.log(await hashWrapper());
    } catch (e) {
      console.error(e, "in creating user");
      handleErrorRedirect(
        "/auth/register",
        "Server encountered an error. Please try again"
      );
    }

    redirect("/auth/login");
  }

  return (
    <>
      <ErrorMessage />

      <form action={register} className='box form' >
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
  )
}
