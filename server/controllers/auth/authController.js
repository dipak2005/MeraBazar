const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
require("dotenv").config();

// register
const registeredUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User is alredy exist with the same email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User saved Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }
    const checkUser = await UserModel.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "No account found. Please register.",
      });
    }

    const checkUserPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkUserPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "168h" } //  7- days cookies will store and after user will need to login again
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true }).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised access!",
    });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decodeToken;
    next();
    console.log(decodeToken);
  } catch (e) {
    console.error(e);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = { registeredUser, loginUser, logoutUser, authMiddleware };
