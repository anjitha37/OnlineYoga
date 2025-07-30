const jwt = require("jsonwebtoken");

const verifyInstructor = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, "jwtsecretkey123"); 
    if (decoded.role.toLowerCase() !== "instructor") {
  return res.status(403).json({ message: "Access denied. Not an instructor." });
}


    req.userId = decoded.id; // ✅ Add userId to request object
    next(); // ✅ Proceed to the route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyInstructor;
