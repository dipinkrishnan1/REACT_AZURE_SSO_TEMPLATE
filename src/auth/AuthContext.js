
import { useMsal } from "@azure/msal-react";
import React, { createContext, useContext, useEffect, useState } from "react";



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
 
  };
  useEffect(() => {
    const checkAdmin = async () => {
      setIsAdmin(true); //Setting to Admin
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
