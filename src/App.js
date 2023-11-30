import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SnackbarProvider from "./components/SnackbarProvider";
import { LoaderProvider } from "./context/LoaderContext";
import { AuthProvider } from "./auth/AuthContext";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
import "./App.css";

// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";

import { msalConfig, loginRequest } from "./auth/authConfig";
import getProfilecGraph from "./api/getProfileGraph";

// ----------------------------------------------------------------------
const msalInstance = new PublicClientApplication(msalConfig);

// Calendars.ReadWrite Chat.Read Chat.ReadBasic Contacts.ReadWrite DeviceManagementRBAC.Read.All DeviceManagementServiceConfig.Read.All Files.ReadWrite.All Group.ReadWrite.All IdentityRiskEvent.Read.All Mail.Read Mail.ReadWrite MailboxSettings.ReadWrite Notes.ReadWrite.All openid People.Read Place.Read Presence.Read Presence.Read.All PrinterShare.ReadBasic.All PrintJob.Create PrintJob.ReadBasic profile Reports.Read.All Sites.ReadWrite.All Tasks.ReadWrite User.Read User.ReadBasic.All User.ReadWrite User.ReadWrite.All email
// const request = {
//   scopes: ["openid", "profile", "User.Read.All", "User.ReadBasic.All"],
// };
// Account selection logic is app dependent. Adjust as needed for different use cases.
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    msalInstance
      .acquireTokenSilent(loginRequest)
      .then((response) => {
        localStorage.setItem("hrms-token", response.accessToken);

        getProfilecGraph().then((responseProfile) => {
          // console.log(responseProfile);
          localStorage.setItem("hrms-profile", JSON.stringify(responseProfile));
        });
      })
      .catch((error) => {
        console.error("Failed to acquire token:", error);
      });
  }

  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    console.log("successfully logged in");
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);

    msalInstance
      .acquireTokenSilent(loginRequest)
      .then((response) => {
        localStorage.setItem("hrms-token", response.accessToken);

        getProfilecGraph().then((responseProfile) => {
          localStorage.setItem("hrms-profile", JSON.stringify(responseProfile));
        });
      })
      .catch((error) => {
        console.error("Failed to acquire token:", error);
      });
  }

  if (event.eventType === EventType.LOGOUT_SUCCESS) {
    if (msalInstance.getAllAccounts().length > 0) {
      msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }
  }

  if (event.eventType === EventType.LOGIN_FAILURE) {
    // console.log(JSON.stringify(event));
  }
});

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LoaderProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <ScrollToTop />
              <StyledChart />
              <MsalProvider instance={msalInstance}>
                <AuthProvider>
                  <Router />
                </AuthProvider>
              </MsalProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </LoaderProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
