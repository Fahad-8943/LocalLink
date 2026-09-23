import ServiceCard from "./ServiceCard";

function ServiceList({ services }) {
  return (
    <div className="service-list-wrapper">
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceList;