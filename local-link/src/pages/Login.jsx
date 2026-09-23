import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/userService";
import ProviderRegister from "../components/ProviderRegister";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const result = await getUsers();

      const user = result.data.find(
        (user) =>
          user.username.trim() === loginData.username.trim() &&
          user.password === loginData.password
      );

      if (!user) {
        setError("Invalid username or password");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    }
  };

  const handleGuest = () => {
    localStorage.removeItem("currentUser");
    navigate("/home");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-brand">Local Link</h1>
          <p className="auth-tagline">
            Find trusted local services around you.
          </p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              name="username"
              className="form-input"
              placeholder="Enter provider username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter provider password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: "8px" }}
          >
            Provider Login
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-block"
          onClick={handleGuest}
        >
          Continue as Guest
        </button>

        <div className="auth-footer">
          <p style={{ marginBottom: "10px" }}>Don't have a provider account?</p>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => setShowRegister(true)}
          >
            Register as Provider
          </button>
        </div>

        {showRegister && (
          <ProviderRegister
            onClose={() => setShowRegister(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Login;