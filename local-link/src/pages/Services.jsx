import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchService } from "../redux/servicesSlice";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import ServiceList from "../components/ServiceList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import LocationButton from "../components/LocationButton";
import { calculateDistance } from "../utils/distance";

function Services() {
  const dispatch = useDispatch();

  const {
    allServices,
    loading,
    error,
  } = useSelector((state) => state.services);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [receiverLocation, setReceiverLocation] = useState(null);
  const [nearbyOnly, setNearbyOnly] = useState(false);

  useEffect(() => {
    dispatch(fetchService());
  }, [dispatch]);

  const categories = [
    "Home Repair",
    "Electrical",
    "Automotive",
    "Computer & Technology",
    "Mobile Repair",
    "Education",
    "Cleaning",
    "Photography",
  ];

  const filteredServices = useMemo(() => {
    let result = allServices.filter((service) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        service.serviceName
          ?.toLowerCase()
          .includes(searchText) ||
        service.providerName
          ?.toLowerCase()
          .includes(searchText) ||
        service.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "" ||
        service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "rating-high") {
      result.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    let servicesWithDistance = result.map((service) => {
      let distance = null;

      if (receiverLocation) {
        if (
          service.latitude !== null &&
          service.latitude !== undefined &&
          service.longitude !== null &&
          service.longitude !== undefined &&
          service.latitude !== "" &&
          service.longitude !== ""
        ) {
          distance = calculateDistance(
            receiverLocation.latitude,
            receiverLocation.longitude,
            service.latitude,
            service.longitude
          );
        } else {
          distance = "unavailable";
        }
      }

      return {
        ...service,
        distance,
      };
    });

    if (nearbyOnly && receiverLocation) {
      servicesWithDistance = servicesWithDistance.filter(
        (service) =>
          typeof service.distance === "number" && service.distance <= 10
      );
    }

    return servicesWithDistance;
  }, [allServices, search, selectedCategory, sortBy, receiverLocation, nearbyOnly]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="services-page">
      <div className="services-page-header">
        <h1 className="services-page-title">Find Local Services</h1>
        <p className="services-page-subtitle">
          Search, filter by category, sort by price or rating, and locate nearby service providers.
        </p>
      </div>

      <div className="toolbar-panel">
        <div className="toolbar-top-row">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by service name, provider, or location..."
          />

          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="toolbar-location-row">
          <LocationButton
            buttonText="Find Services Near Me"
            loadingText="Detecting your location..."
            successMessage="Your location has been detected."
            onLocationCaptured={setReceiverLocation}
          />

          <button
            type="button"
            className={`btn-nearby-toggle ${nearbyOnly ? "active" : ""}`}
            onClick={() => setNearbyOnly((prev) => !prev)}
            disabled={!receiverLocation}
          >
            <span>🎯</span> Nearby Services
          </button>

          {nearbyOnly && (
            <span className="nearby-indicator-badge">
              (Showing services within 10 km)
              <button
                type="button"
                className="btn-clear-nearby"
                onClick={() => setNearbyOnly(false)}
              >
                Clear Filter
              </button>
            </span>
          )}

          {!receiverLocation && (
            <p className="location-status-text">
              Detect your location first to filter nearby services.
            </p>
          )}
        </div>
      </div>

      <div className="services-results-section">
        <div className="section-header-row">
          <h2 className="section-header-title">Services Directory</h2>
          <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
            Showing {filteredServices.length} {filteredServices.length === 1 ? "result" : "results"}
          </span>
        </div>

        {filteredServices.length === 0 ? (
          <EmptyState />
        ) : (
          <ServiceList services={filteredServices} />
        )}
      </div>
    </div>
  );
}

export default Services;