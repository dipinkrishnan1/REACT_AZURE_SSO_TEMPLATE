import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

import { Navigate } from "react-router-dom";
import LoginPage from "src/pages/LoginPage";

export const LandingPage = () => {
  const { instance } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const currentAccount = instance.getActiveAccount();

  const onLoad = async () => {
    // console.log('currentAccount.idTokenClaims', currentAccount.idTokenClaims, currentAccount);
    if (currentAccount) {
      // eslint-disable-next-line react/prop-types
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, currentAccount]);

  return (
    <>
      {isAuthorized ? (
        // eslint-disable-next-line react/prop-types
        <Navigate to="/dashboard/profile" />
      ) : (
        <LoginPage />
      )}
    </>
  );
};
