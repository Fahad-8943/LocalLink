import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ServiceForm from "../components/ServiceForm";
import ErrorMessage from "../components/ErrorMessage";
import { createService } from "../redux/servicesSlice";

function AddService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.services);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login as a provider first.");
      navigate("/");
    }
  }, [navigate]);

  const handleAddService = async (formData) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      alert("Please login as a provider first.");
      navigate("/");
      return;
    }

    const serviceData = {
      ...formData,

      providerId: currentUser.id,
      providerName: currentUser.name,

      rating: 0,

      latitude: formData.latitude ?? null,
      longitude: formData.longitude ?? null,
    };

    const resultAction = await dispatch(createService(serviceData));

    if (createService.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return (
    <div>
      <Link to="/home" className="service-details-back-link">
        ← Back to Dashboard
      </Link>

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Add Your Service</h1>
          <p className="form-subtitle">
            Create a new service listing to connect with local customers in your area.
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        <ServiceForm onSubmit={handleAddService} />
      </div>
    </div>
  );
}

export default AddService;