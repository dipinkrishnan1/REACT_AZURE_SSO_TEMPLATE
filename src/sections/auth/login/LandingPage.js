import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

export const LandingPage = () => {
  const { instance } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const currentAccount = instance.getActiveAccount();
  useEffect(() => {
    const onLoad = () => {
      if (currentAccount) {
        setIsAuthorized(true);
      }
  
    };
    onLoad();
   
  }, [instance, currentAccount]);

  return (
    <>
      {isAuthorized ? (
        // eslint-disable-next-line react/prop-types
        <Navigate to="/dashboard/profile" />
      ) : (
        <h4>Logging in...</h4>
      )}
    </>
  );
};
