import axios from "axios";
import { createContext, useEffect, useState } from "react";

const authContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "http://localhost:5005";

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${baseUrl}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data; // this is the payload
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const exposedValues = {
    baseUrl,
    authenticateUser,
    isLoggedIn,
    isLoading,
    user
  };

  return <authContext.Provider value={exposedValues}>{children}</authContext.Provider>;
}

export { authContext, AuthProviderWrapper };
