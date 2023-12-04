"use server";
import mongoose from "mongoose";
import { IFile } from "@/app/_config/schemas";

const FileModel = mongoose.model<IFile>("File");

export async function handleSaveAction(content: string, fileID: string) {
  const dataBuffer = Buffer.from(content);
  try {
    await FileModel.findByIdAndUpdate(fileID, {
      data: dataBuffer,
      size: content.length,
    });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
}
