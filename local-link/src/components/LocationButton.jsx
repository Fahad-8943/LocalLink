import { useState } from "react";

function LocationButton({
  onLocationCaptured,
  buttonText = "Use My Current Location",
  loadingText = "Getting location...",
  successMessage = "Location captured",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);

  const handleGetLocation = () => {
    setError("");
    setCoords(null);

    // Check if Geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCoords({ latitude, longitude });

        if (onLocationCaptured) {
          onLocationCaptured({ latitude, longitude });
        }
      },
      (geoError) => {
        setLoading(false);
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            setError(
              "Location permission denied. Please allow location access in your browser."
            );
            break;
          case geoError.POSITION_UNAVAILABLE:
            setError(
              "Location information is unavailable. Please try again."
            );
            break;
          case geoError.TIMEOUT:
            setError(
              "Request to get location timed out. Please try again."
            );
            break;
          default:
            setError(
              "An error occurred while retrieving location."
            );
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="location-btn-wrapper">
      <button
        type="button"
        className="btn btn-outline"
        onClick={handleGetLocation}
        disabled={loading}
      >
        <span>📍</span> {loading ? loadingText : buttonText}
      </button>

      {coords && (
        <p className="location-success-text">
          ✓ {successMessage} (Lat: {coords.latitude.toFixed(4)}, Lon: {coords.longitude.toFixed(4)})
        </p>
      )}

      {error && (
        <p className="location-error-text">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export default LocationButton;
