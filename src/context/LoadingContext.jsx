import React, { createContext, useContext, useState } from 'react';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
});

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <LoadingSpinner />
      )}
    </LoadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export default LoadingProvider;