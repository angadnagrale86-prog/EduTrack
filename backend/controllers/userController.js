const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL CONFIG ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY ✅");
  }
});

// ===============================
// REGISTER STUDENT
// ===============================
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      rollNumber,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      rollNumber: rollNumber || "",
      email,
      phone,
      password,
      role: "student",
    });

    res.status(201).json({
      success: true,
      message: "Student account created successfully 🎉",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        rollNumber: user.rollNumber,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// LOGIN STUDENT
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        rollNumber: user.rollNumber,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// GET STUDENT PROFILE
// ===============================
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// ===============================
// UPDATE STUDENT PROFILE
// ===============================
const updateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      rollNumber,
      phone,
      department,
      semester,
      skills,
      linkedin,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.rollNumber = rollNumber || "";
    user.phone = phone || user.phone;
    user.department = department || "";
    user.semester = semester || "";
    user.skills = skills || "";
    user.linkedin = linkedin || "";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Student profile updated successfully 🎉",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        rollNumber: user.rollNumber,
        email: user.email,
        phone: user.phone,
        department: user.department,
        semester: user.semester,
        skills: user.skills,
        linkedin: user.linkedin,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "EduTrack - Reset Your Student Portal Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px;">
          <h2>EduTrack Password Reset</h2>
          <p>Hello ${user.firstName},</p>
          <p>We received a request to reset your EduTrack Student Portal password.</p>
          <a href="${resetLink}" style="display:inline-block;padding:12px 25px;background:#4f46e5;color:white;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
          <p style="margin-top:20px;">This link will expire in 15 minutes.</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
  }
};

// ===============================
// RESET PASSWORD
// ===============================
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or expired",
      });
    }

    user.password = password;
    user.resetPasswordToken = "";
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully 🎉",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
