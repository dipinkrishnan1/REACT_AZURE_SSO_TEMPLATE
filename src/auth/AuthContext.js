// AuthContext.js
import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useEffect, useState } from "react";

import getEmployee from "src/api/getEmployeeDetails";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accounts } = useMsal();
  const user = accounts[0];
  const account = {
    displayName: user?.name,
    email: user?.username,
    // photoURL: '/assets/images/avatars/avatar_default.jpg',
  };
  useEffect(() => {
    const checkAdmin = async () => {
      const response = await getEmployee("view", account.email);
      setIsAdmin(response.isAdmin);
      setLoading(false);
    };
    checkAdmin();
  }, [account.email]);

  return (
    <AuthContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
