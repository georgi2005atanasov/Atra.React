import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    setLoading,
  };
};

export const useTotp = () => {
  const [totp, setTotp] = useState("");
  const [isTotpSent, setIsTotpSent] = useState(false);
  const [error, setError] = useState("");

  return {
    totp,
    setTotp,
    isTotpSent,
    setIsTotpSent,
    error,
    setError,
  };
};

export default function useAuth(token) {
  let isAdmin = false;
  let isEmployee = false;
  let isAuthenticated = false;

  try {
    const tokenData = jwtDecode(token);

    if (tokenData) {
      if (Array.isArray(tokenData.role)) {
        isAdmin = tokenData.role.includes("Admin");
        isEmployee = tokenData.role.includes("Employee");
        isAuthenticated =
          tokenData.role.includes("Admin") ||
          tokenData.role.includes("Employee");
      } else {
        isAdmin = tokenData.role === "Admin";
        isEmployee = tokenData.role == "Employee";
        isAuthenticated = ["Employee", "Admin"].includes(tokenData.role);
      }
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
  }

  return { isAuthenticated, isAdmin, isEmployee };
}
