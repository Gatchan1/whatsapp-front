export default function Alert({ message, setError }) {
  const dismissErrorHandler = () => {
    setError("");
  };

  return (
    <div>
      <p>{message}</p>
      <button type="button" className="auth alert" onClick={dismissErrorHandler}>
        Okay
      </button>
    </div>
  );
}