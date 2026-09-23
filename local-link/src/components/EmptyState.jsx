
function EmptyState({
  title = "No services found",
  message = "Try changing your search or filter.",
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">🔍</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
}

export default EmptyState;