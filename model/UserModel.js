import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  authId: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  stats: [
    {
      date: {
        type: Date,
      },
      timeSpent: {
        type: Number,
      },
      notified: {
        type: Number,
      },
    },
  ],
  goals: [
    {
      date: {
        type: Date,
      },
      target: {
        type: Number,
      },
      achieved: {
        type: Boolean,
      },
    },
  ],
});

const User = mongoose.model("User", UserModel);

export default User;
