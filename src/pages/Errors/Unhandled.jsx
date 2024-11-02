import React from 'react';

class Unhandled extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="row justify-content-center w-100">
            <div className="col-12 col-md-6">
              <div className="card border-0 shadow">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h3 className="text-danger mb-4">Something went wrong!</h3>
                  <p className="text-muted mb-4">
                    {this.state.error?.message || 'An unexpected error occurred.'}
                  </p>
                  <button 
                    className="btn btn-primary px-4"
                    onClick={() => window.location.href = '/'}
                  >
                    Return Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default Unhandled;