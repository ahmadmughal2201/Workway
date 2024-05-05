import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isRecruiting: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "", // Assuming it's a URL to the image
    },
    resumeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
