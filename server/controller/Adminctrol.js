
const User = require("../model/usermodel"); 
const Class =require("../model/classmodel")


// 1. Get user registrations by month
const getUserRegistrationStats = async () => {
  const pipeline = [
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
  ];
  const data = await User.aggregate(pipeline);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return data.map((d) => ({ month: monthNames[d.month - 1], count: d.count }));
};

// 2. Get session types distribution
const getSessionTypesStats = async () => {
  const pipeline = [
     { $match: { className: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: "$className",
        value: { $sum: 1 },
      },
    },
    {
      $project: {
        name: "$_id",
        value: 1,
        _id: 0,
      },
    },
  ];
  return await Class.aggregate(pipeline);
};

// 📊 Admin reports endpoint
const getReports = async (req, res) => {
  try {
    const userRegistrations = await getUserRegistrationStats();
    const sessionTypes = await getSessionTypesStats();

    res.status(200).json({ userRegistrations, sessionTypes });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ msg: "Server error generating reports" });
  }
};


// Fetch all registered users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // No select() — gets all fields
    res.status(200).json(users);
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};


// Approve a user (typically an instructor)
const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User approved successfully", user });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ msg: "Server error approving user" });
  }
};


// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ msg: "Server error deleting user" });
  }
};




// Fetch single user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ msg: "Server error fetching user" });
  }
};


// Get Admin Profile by unique email (admin@gmail.com)
const getAdminProfile = async (req, res) => {
  try {
    // Find admin user by email and role (just to be safe)
    const adminUser = await User.findOne({ email: "admin@gmail.com", role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ msg: "Admin user not found" });
    }

    res.status(200).json(adminUser);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ msg: "Server error fetching admin profile" });
  }
};
module.exports = { getAllUsers, deleteUser, getUserById, approveUser, getAdminProfile, getReports };



