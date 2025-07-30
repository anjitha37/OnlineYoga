import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // or a loading spinner
}

export default AdminLogout;
