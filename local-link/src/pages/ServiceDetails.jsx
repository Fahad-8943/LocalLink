import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchService, deleteService } from "../redux/servicesSlice";

function ServiceDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allServices, loading, error } = useSelector((state) => state.services);

  const service = allServices.find((service) => service.id === id);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (allServices.length === 0) {
      dispatch(fetchService());
    }
  }, [dispatch, allServices.length]);

  if (loading || (allServices.length === 0 && !error)) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!service) {
    return (
      <div className="empty-state-card" style={{ maxWidth: "480px", margin: "40px auto" }}>
        <h3 className="empty-state-title">Service Not Found</h3>
        <p className="empty-state-message">
          The requested service could not be found or may have been removed.
        </p>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to Services
        </Link>
      </div>
    );
  }

  const isOwner = currentUser && service.providerId === currentUser.id;

  const handleDelete = async () => {
    const activeUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!activeUser || activeUser.id !== service.providerId) {
      alert("You are not authorized to delete this service.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) {
      return;
    }

    const actionResult = await dispatch(deleteService(service.id));

    if (deleteService.fulfilled.match(actionResult)) {
      navigate("/home");
    } else {
      alert("Failed to delete service. Please try again.");
    }
  };

  return (
    <div>
      <Link to="/services" className="service-details-back-link">
        ← Back to all services
      </Link>

      <div className="service-details-card">
        <div className="service-details-header">
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <span className="service-category-tag">{service.category}</span>
              {service.rating > 0 && (
                <span className="service-rating-badge">★ {service.rating}</span>
              )}
            </div>

            <h1 className="service-details-title">{service.serviceName}</h1>
            <p className="service-card-provider">
              Offered by <strong>{service.providerName}</strong>
            </p>
          </div>

          <div className="service-details-price-badge">
            <span className="service-price-label">Starting Price</span>
            <div className="service-details-price-amount">₹{service.price}</div>
          </div>
        </div>

        <div className="service-description-box">
          <h3 className="service-description-title">About this service</h3>
          <p className="service-description-text">
            {service.description || "No description provided by the service provider."}
          </p>
        </div>

        <div className="service-details-grid">
          <div className="service-detail-item">
            <span className="service-detail-label">Service Area</span>
            <span className="service-detail-value">📍 {service.location}</span>
          </div>

          <div className="service-detail-item">
            <span className="service-detail-label">Contact Phone</span>
            <span className="service-detail-value">📞 {service.phone || "Not provided"}</span>
          </div>

          <div className="service-detail-item">
            <span className="service-detail-label">Availability</span>
            <span className="service-detail-value">🗓 {service.availability || "Not specified"}</span>
          </div>

          <div className="service-detail-item">
            <span className="service-detail-label">Working Hours</span>
            <span className="service-detail-value">⏰ {service.workingHours || "Not specified"}</span>
          </div>
        </div>

        {isOwner && (
          <div className="owner-actions-panel">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate(`/edit-service/${service.id}`)}
            >
              ✎ Edit Service
            </button>

            <button
              type="button"
              className="btn btn-danger-outline"
              onClick={handleDelete}
            >
              🗑 Delete Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
