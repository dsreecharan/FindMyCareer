function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="button button-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage; 