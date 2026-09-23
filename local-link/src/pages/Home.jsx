import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchService } from "../redux/servicesSlice";

import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import ServiceList from "../components/ServiceList";
import ServiceCard from "../components/ServiceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { allServices, loading, error } = useSelector(
    (state) => state.services
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // Guest filtered services (all providers)
  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesSearch =
        service.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
        service.providerName?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allServices, search, selectedCategory]);

  // Provider's own services (filtered by providerId)
  const myServices = useMemo(() => {
    if (!currentUser) return [];
    return allServices.filter(
      (service) => service.providerId === currentUser.id
    );
  }, [allServices, currentUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // PROVIDER MODE: Personalized "My Services" area
  if (currentUser) {
    return (
      <div className="provider-dashboard">
        <div className="provider-dashboard-header">
          <div className="provider-welcome-text">
            <h1>Welcome, {currentUser.name}</h1>
            <p>Manage your service listings and update your business profile.</p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/add-service")}
          >
            + Add Service
          </button>
        </div>

        <div className="section-header-row">
          <h2 className="section-header-title">My Services</h2>
          <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
            {myServices.length} {myServices.length === 1 ? "service" : "services"} listed
          </span>
        </div>

        {myServices.length === 0 ? (
          <div>
            <EmptyState message="You haven't added any services yet." />
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/add-service")}
              >
                + Add Service
              </button>
            </div>
          </div>
        ) : (
          <div className="services-grid">
            {myServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // GUEST MODE: Public browsing home
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-pill-tag">Community Marketplace</span>
          <h1 className="hero-title">Local Link</h1>
          <p className="hero-subtitle">
            Find trusted local services around you.
          </p>
          <p className="hero-desc">
            Connect with skilled neighborhood professionals for home maintenance, tech repairs, tutoring, and more.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/services")}
            >
              Browse All Services
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/")}
            >
              Provider Portal
            </button>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: "24px" }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search services by name or provider..."
        />
      </div>

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {selectedCategory && (
        <div className="category-clear-bar">
          <span>Filtering by: <strong>{selectedCategory}</strong></span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setSelectedCategory("")}
          >
            Clear Category
          </button>
        </div>
      )}

      <div style={{ marginTop: "28px" }}>
        <div className="section-header-row">
          <h2 className="section-header-title">Available Services</h2>
          <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
            Showing {filteredServices.length} {filteredServices.length === 1 ? "service" : "services"}
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

export default Home;
