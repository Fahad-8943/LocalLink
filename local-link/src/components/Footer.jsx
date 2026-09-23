import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentYear = new Date().getFullYear();

  const isLoginPage = location.pathname === "/";

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div>
            <h3 className="footer-brand">Local Link</h3>
            <p className="footer-tagline">
              Find trusted local services around you.
            </p>
          </div>

          {!isLoginPage && (
            <div className="footer-links">
              <Link to="/home" className="footer-link">
                Home
              </Link>
              <Link to="/services" className="footer-link">
                Services
              </Link>
              {currentUser && (
                <Link to="/add-service" className="footer-link">
                  Add Service
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} Local Link{!isLoginPage && ". All rights reserved."}
          </p>
          {!isLoginPage && (
            <p className="footer-copy">
              Connecting communities with local service providers.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;