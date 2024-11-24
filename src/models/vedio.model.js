import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const vedioSchema = new Schema(
  {
    vedioFile: {
      type: String, //cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

vedioSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", vedioSchema);



const asad = (cb)=>{
cb(1,2)
}
asad((n1,n2)=>{
  n1 + n2
})