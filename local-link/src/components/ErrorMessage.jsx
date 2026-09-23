function ErrorMessage({ message }) {
  return (
    <div className="alert-error" role="alert">
      <span>⚠</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;