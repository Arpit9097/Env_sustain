import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../api";
import "./Sidebar.css";

function Sidebar({ isOpen, closeSidebar }) {

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

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

      await logout();

      closeSidebar();

      navigate("/login");

    }

  };

  return (

    <div className={`sidebar ${isOpen ? "open" : ""}`}>

      <h2>SustainAI</h2>

      <nav className="sidebar-links">

        <Link to="/" onClick={closeSidebar}>
          <span className="sidebar-icon">🏠</span>
          Dashboard
        </Link>

        <Link to="/input" onClick={closeSidebar}>
          <span className="sidebar-icon">✏️</span>
          Daily Input
        </Link>

        <Link to="/assistant" onClick={closeSidebar}>
          <span className="sidebar-icon">🤖</span>
          AI Assistant
        </Link>

        <Link to="/reports" onClick={closeSidebar}>
          <span className="sidebar-icon">📊</span>
          Reports
        </Link>

      </nav>

      <button
        className="sidebar-logout-btn"
        onClick={handleLogout}
        title="Logout"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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

        Logout

      </button>

    </div>

  );

}

export default Sidebar;