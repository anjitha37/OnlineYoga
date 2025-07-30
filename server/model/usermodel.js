// models/usermodel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: [true, "Full name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  phone: { type: String, required: [true, "Phone number is required"] },
  age: { type: Number, required: [true, "Age is required"], min: 10, max: 100 },
  gender: { 
    type: String, 
    enum: ["male", "female", "other"], 
    required: [true, "Gender is required"] 
  },
  experience: { 
    type: String, 
    enum: ["beginner", "intermediate", "advanced"], 
    required: function() { return this.role === "user"; } // ✅ Conditional requirement
  },
  role: { 
    type: String, 
    enum: ["user", "instructor"], 
    required: [true, "Role is required"] 
  },
  certificate: { 
    type: String, 
    required: function() { return this.role === "instructor"; } // ✅ Conditional requirement
  },
  agreeTerms: { 
    type: Boolean, 
    required: [true, "You must agree to terms and conditions"],
    validate: {
      validator: v => v === true,
      message: "You must agree to terms and conditions"
    }
  },
  isApproved: { 
    type: Boolean, 
    default: function() { return this.role !== "instructor"; } // Auto-set based on role
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
