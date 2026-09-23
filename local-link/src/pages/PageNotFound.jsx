import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-not-found-card">
      <div className="not-found-code">404</div>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-text">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/home" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}

export default PageNotFound;