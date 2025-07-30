import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    // If you store other user info, remove them too:
    // localStorage.removeItem("userName");
    // localStorage.removeItem("userEmail");

    // Redirect to login page (or home)
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // or a spinner/message if you want
}

export default UserLogout;
