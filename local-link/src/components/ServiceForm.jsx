import { useState } from "react";
import LocationButton from "./LocationButton";

function ServiceForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    serviceName: initialData.serviceName || "",
    category: initialData.category || "",
    description: initialData.description || "",
    price: initialData.price || "",
    location: initialData.location || "",
    phone: initialData.phone || "",
    availability: initialData.availability || "",
    workingHours: initialData.workingHours || "",
    latitude: initialData.latitude ?? null,
    longitude: initialData.longitude ?? null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationCaptured = ({ latitude, longitude }) => {
    setFormData((prevData) => ({
      ...prevData,
      latitude,
      longitude,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <h3 className="form-section-title">General Information</h3>

      <div className="form-group">
        <label className="form-label" htmlFor="serviceName">Service Name *</label>
        <input
          id="serviceName"
          type="text"
          name="serviceName"
          className="form-input"
          placeholder="e.g. QuickFix Mobile Care"
          value={formData.serviceName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Home Repair">Home Repair</option>
          <option value="Electrical">Electrical</option>
          <option value="Automotive">Automotive</option>
          <option value="Computer & Technology">
            Computer & Technology
          </option>
          <option value="Mobile Repair">Mobile Repair</option>
          <option value="Education">Education</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Photography">Photography</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-textarea"
          placeholder="Describe your service, experience, and what you offer..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <h3 className="form-section-title">Location & Pricing</h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="price">Starting Price (₹) *</label>
          <input
            id="price"
            type="number"
            name="price"
            className="form-input"
            placeholder="e.g. 350"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">Location / Area *</label>
          <input
            id="location"
            type="text"
            name="location"
            className="form-input"
            placeholder="e.g. Koyilandy Town"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Service Geolocation Coordinates</label>
        <p className="form-hint" style={{ marginBottom: "8px" }}>
          Capture your precise coordinates so customers nearby can find you.
        </p>
        <LocationButton onLocationCaptured={handleLocationCaptured} />
        {formData.latitude !== null && formData.longitude !== null && (
          <p className="location-success-text" style={{ marginTop: "4px" }}>
            Coordinates saved: {Number(formData.latitude).toFixed(4)}, {Number(formData.longitude).toFixed(4)}
          </p>
        )}
      </div>

      <h3 className="form-section-title">Contact & Availability</h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Contact Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="e.g. 9847112233"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="availability">Days Available</label>
          <input
            id="availability"
            type="text"
            name="availability"
            className="form-input"
            placeholder="e.g. Mon - Sat"
            value={formData.availability}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="workingHours">Working Hours</label>
        <input
          id="workingHours"
          type="text"
          name="workingHours"
          className="form-input"
          placeholder="e.g. 9:00 AM - 6:00 PM"
          value={formData.workingHours}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-block">
          Save Service
        </button>
      </div>
    </form>
  );
}

export default ServiceForm;