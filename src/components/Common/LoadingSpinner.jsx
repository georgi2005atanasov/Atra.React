const LoadingSpinner = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role='alert'>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;