import "@/app/_config/dbConnect";
import "@/app/_config/schemas";
import type { IFile, IUser } from "@/app/_config/schemas";
import { jwtVerify } from "jose";
import mongoose from "mongoose";

import { cookies } from "next/headers";

const UserModel = mongoose.model("User");
const FileModel = mongoose.model("File");

export async function DELETE(
  request: Request,
  { params }: { params: { fileID: string } }
) {
  const fileID = params.fileID;
  const cookieStore = cookies();

  const token = cookieStore.get("authToken")?.value as string;
  let userId, username;

  try {
    const { payload, protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
    userId = payload.userId;
    username = payload.username;
  } catch (err) {
    return new Response(null, {
      status: 500,
      statusText: "Could not retrieve user",
    });
  }

  try {
    const file = await FileModel.findById(fileID);
    const user = await UserModel.findById(file?.owner);

    if (user._id != userId) {
      return new Response(null, {
        status: 400,
        statusText: "Could not authenticate user",
      });
    }

    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        files: fileID,
      },
    });

    console.log(await UserModel.findById(userId));

    await FileModel.deleteOne({_id: fileID}).exec();
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
      statusText: "Server encountered an error",
    });
  }

  return Response.json({
    status: "file deleted",
  });   
}
