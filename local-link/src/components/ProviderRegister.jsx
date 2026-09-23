import { useState } from "react";
import { createUser, getUsers } from "../services/userService";

function ProviderRegister({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "provider",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const result = await getUsers();

      const usernameExists = result.data.some(
        (user) =>
          user.username.toLowerCase().trim() ===
          formData.username.toLowerCase().trim(),
      );

      if (usernameExists) {
        setError("Username already exists. Choose another username.");
        return;
      }

      const newUser = {
        ...formData,
        name: formData.name.trim(),
        username: formData.username.trim(),
      };

      await createUser(newUser);

      setSuccess("Account created successfully!");

      setFormData({
        name: "",
        username: "",
        password: "",
        role: "provider",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="modal-title">Register as Provider</h2>
        <p className="modal-subtitle">
          Create your provider account to start listing services.
        </p>

        {error && <div className="alert-error">{error}</div>}
        {success && <div className="alert-success">{success}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g. Fahad"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-username">Username</label>
            <input
              id="reg-username"
              type="text"
              name="username"
              className="form-input"
              placeholder="e.g. fahad123"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "12px" }}>
            Create Provider Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProviderRegister;
