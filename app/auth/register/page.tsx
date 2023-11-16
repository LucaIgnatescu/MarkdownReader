import {ErrorMessage} from '@/components/client';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';
import { encode } from 'querystring';
import bcrypt from 'bcrypt';
import { IUser } from '@/app/_config/schemas';

export default function Page() {

  function handleErrorRedirect(error: string){
    const query = encode({error});
    return redirect('/auth/register?' + error);
  }

  async function register(e: FormData) {
    "use server";
    const User = mongoose.model<IUser>('User');
    if (e.get('password') !== e.get('retyped')){
      handleErrorRedirect("Passwords do not match!");
    }
    const username:string = e.get('username') as string ?? " ";
    const password = e.get('password') as string || " ";

    if (await User.exists({username: username})){
      handleErrorRedirect("Username already exists");
    }
    /**
     * TODO: add more username checking like lowercase everything etcetcetc
     */
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err){
        handleErrorRedirect("Server error. Please try again");
      }
      try{
        const newUser = new User({username, password});
        await newUser.save();
      } catch(e){
        handleErrorRedirect("Server error. Please try again");
      }
    })

    redirect('/auth/login');
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
        <input name="retyped" id="retyped" type="retyped" required></input>
        <br></br>
        <input type="submit" value={"Submit!"}></input>
      </form>
    </>
  );
}
