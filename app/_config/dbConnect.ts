import mongoose  from "mongoose";

try{
    await mongoose.connect(process.env.MONGOURI ?? "");
    console.log("connected");
} catch(e) {
    console.error(e);
}