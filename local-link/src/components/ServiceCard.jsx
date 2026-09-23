import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/service-details/${service.id}`);
  };

  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-category-tag">{service.category}</span>
        {service.rating > 0 && (
          <span className="service-rating-badge" title={`Rating: ${service.rating}`}>
            ★ {service.rating}
          </span>
        )}
      </div>

      <h3 className="service-card-title">{service.serviceName}</h3>

      <p className="service-card-provider">By {service.providerName}</p>

      <p className="service-card-location">
        <span>📍</span> {service.location}
      </p>

      <div className="service-card-footer">
        <div className="service-card-price-group">
          <span className="service-price-label">Starting at</span>
          <span className="service-card-price">₹{service.price}</span>
        </div>

        {typeof service.distance === "number" && (
          <span className="service-distance-pill">
            {service.distance.toFixed(1)} km away
          </span>
        )}

        {service.distance === "unavailable" && (
          <span className="service-distance-unavailable">
            Distance unavailable
          </span>
        )}

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default ServiceCard;
