import API_BASE_URL from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      // Firebase token for backend verification
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${API_BASE_URL}/api/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Logout API failed");
      }

    } catch (err) {

      console.error("Backend logout error:", err);

    } finally {

      // Firebase logout (client side)
      await logout();

      navigate("/login");

    }

  };

  return (
    <div className="navbar">

      <h3>Personal Sustainability Dashboard</h3>

      <div className="navbar-right">

        {currentUser && (
          <span className="navbar-email">
            {currentUser.email}
          </span>
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Logout"
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>

          <span className="logout-label">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
}

export default Navbar;