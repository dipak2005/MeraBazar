const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,

  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
      enum: ["user", "admin", "seller"],
    default: "user",
  },

  phone:String,
  gender:String,
  dob:String,
 
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
