import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import ServiceForm from "../components/ServiceForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchService, updateService } from "../redux/servicesSlice";

function EditService() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allServices, loading, error } = useSelector(
    (state) => state.services
  );

  const [service, setService] = useState(null);

  useEffect(() => {
    if (allServices.length === 0) {
      dispatch(fetchService());
    }
  }, [dispatch, allServices.length]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please login as a provider first.");
      navigate("/");
      return;
    }

    const foundService = allServices.find(
      (service) => service.id === id
    );

    if (foundService) {
      if (foundService.providerId !== currentUser.id) {
        alert("You are not authorized to edit this service.");
        navigate("/services");
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setService(foundService);
    }
  }, [allServices, id, navigate]);

  const handleUpdate = async (formData) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please login as a provider first.");
      navigate("/");
      return;
    }

    if (!service || currentUser.id !== service.providerId) {
      alert("You are not authorized to edit this service.");
      navigate("/services");
      return;
    }

    const resultAction = await dispatch(
      updateService({
        id,
        serviceData: formData,
      })
    );

    if (updateService.fulfilled.match(resultAction)) {
      navigate(`/service-details/${id}`);
    }
  };

  if ((loading && !service) || (allServices.length === 0 && !error)) {
    return <LoadingSpinner />;
  }

  if (error && !service) {
    return <ErrorMessage message={error} />;
  }

  if (!service) {
    return (
      <div className="empty-state-card" style={{ maxWidth: "480px", margin: "40px auto" }}>
        <h3 className="empty-state-title">Service Not Found</h3>
        <p className="empty-state-message">The service you are attempting to edit does not exist.</p>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={`/service-details/${id}`} className="service-details-back-link">
        ← Back to Service Details
      </Link>

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Edit Service</h1>
          <p className="form-subtitle">
            Update your service details, pricing, schedule, or location coordinates.
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <ServiceForm
          initialData={service}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}

export default EditService;