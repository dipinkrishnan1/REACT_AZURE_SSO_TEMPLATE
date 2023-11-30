import React, { useState, useEffect } from "react";
import { useMsal, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";

export const RouteGuard = ({ ...props }) => {
  const { instance } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const currentAccount = instance.getActiveAccount();

  const authRequest = {
    ...loginRequest,
  };
  const onLoad = async () => {
    // console.log('currentAccount.idTokenClaims', currentAccount.idTokenClaims, currentAccount);
    if (currentAccount) {
      // eslint-disable-next-line react/prop-types
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, [instance, currentAccount]);

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      {isAuthorized ? (
        // eslint-disable-next-line react/prop-types
        <div>{props.children}</div>
      ) : (
        <div className="data-area-div" />
      )}
    </MsalAuthenticationTemplate>
  );
};
