import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const isLoginPage = location.pathname === "/";
  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="nav-container">
        <div className="nav-brand-group">
          <Link to={isLoginPage ? "/" : "/home"} className="nav-brand">
            <span className="nav-brand-badge" />
            Local Link
          </Link>

          {!isLoginPage && (
            <nav className="nav-links">
              <Link
                to="/home"
                className={`nav-link ${isActive("/home") ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`nav-link ${isActive("/services") ? "active" : ""}`}
              >
                Services
              </Link>
              {currentUser && (
                <Link
                  to="/add-service"
                  className={`nav-link ${isActive("/add-service") ? "active" : ""}`}
                >
                  Add Service
                </Link>
              )}
            </nav>
          )}
        </div>

        {!isLoginPage && (
          <div className="nav-user-panel">
            {currentUser && (
              <span className="provider-identity-tag">
                Provider: <span className="provider-identity-name">{currentUser.name}</span>
              </span>
            )}
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;