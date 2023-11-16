import mongoose from "mongoose";
import { Schema , Types} from "mongoose";
import "./dbConnect";

export interface IUser{
  username:string,
  password:string,
  files?:Types.ObjectId[],
}

export interface IFile{
  fileName:string,
  data:Buffer,
  size:number,
  owner:Types.ObjectId
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }], //a list of references to files owned by user,
  password: { type: String, required: true },
});

const fileSchema = new Schema<IFile>({
  fileName: { type: String, required: true, maxLength: 12 }, //name of file to be set by user
  // owner: {type:Schema.Types.ObjectId, ref: 'User', required:true}, //reference to user that created the file,
  data: { type: Buffer, required: true }, //binary data of actual markdown file (possibly encrypted),
  // uploadDate: {type: Date, required:true},
  size: { type: Number, required: true }, //size of binary data,
  owner: { type: Schema.Types.ObjectId, ref: "User", requried: true }, //file can only have one owner
});

if (!mongoose.models.User) mongoose.model<IUser>("User", userSchema);

if (!mongoose.models.File) mongoose.model<IFile>("File", fileSchema);
